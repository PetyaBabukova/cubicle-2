const { Router } = require('express');
const productService = require('../services/productService');
const accessoryService = require('../services/accessoryService');
const productHelpers = require('./helpers/productHelpers');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

const router = Router();

//Method notation sintaxys - thes could be written as anonimus func, arrow func, etc.
router.get('/', (req, res) => {
    //console.log(req.query);
    productService.getAll(req.query)
        .then(products => {
            res.render('home', { title: 'Browse', products });
        })
        .catch(() => res.status(500).end())
});

router.get('/create', isAuthenticated, (req, res) => {
    res.render('create', { title: 'Create' });
});

router.post('/create', isAuthenticated, productHelpers.validateProduct, (req, res) => {
    // // Callback example
    // productService.create(req.body, (err)=>{
    //     if(err){
    //         return res.status(500).end()
    //     }
    //     res.redirect('/products');
    // })

    // Promise example

    productService.create(req.body, req.user._id)
        .then(() => res.redirect('/products'))
        .catch(() => res.status(500).end())

});

router.get('/details/:productId', async (req, res) => {
    let product = await productService.getOneWithAccessories(req.params.productId)

    res.render('details', { title: 'Product details', product });
});

router.get('/:productId/attach', isAuthenticated, async (req, res) => {

    let product = await productService.getOne(req.params.productId);
    let accessories = await accessoryService.GetAllExcept(product.accessories);

    // console.log(product.accessories);
    // console.log(accessories);

    res.render('attachAccessory', { product, accessories })
});

router.post('/:productId/attach', isAuthenticated, (req, res) => {
    //console.log(req.body);
    productService.attachAccessory(req.params.productId, req.body.accessory)
        .then(() => res.redirect(`/products/details/${req.params.productId}`))
})

router.get('/:productId/edit', isAuthenticated, (req, res) => {
    productService.getOne(req.params.productId)
        .then(product => {

            res.render('editCube', product);

        })
});

router.post('/:productId/edit', isAuthenticated, productHelpers.validateProduct, (req, res) => {
    //TODO: Validate
    productService.updateOne(req.params.productId, req.body)
        .then(response => {
            res.redirect(`/products/details/${req.params.productId}`);

        })
        .catch(error => {

        })

});

router.get('/:productId/delete', isAuthenticated, (req, res) => {

    productService.getOne(req.params.productId)
        .then(product => {

            if (req.user._id.toString() !== product.creator.toString()) {
                res.redirect('/products')

            } else {

                res.render('deleteCube', product);
            }
        });
});

router.post('/:productId/delete', isAuthenticated, (req, res) => {
    //TODO: Validate
    productService.deleteOne(req.params.productId)
        .then(product => {
            if (product._id !== req.user._id) {
                return res.redirect('/products')
            }

            return productService.deleteOne(req.params.productId)
        })
        .then(response => res.redirect('/products'))

});

module.exports = router;