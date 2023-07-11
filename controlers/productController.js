const { Router } = require('express');
const productService = require('../services/productService')
const accessoryService = require('../services/accessoryService')
const productHelpers = require('./helpers/productHelpers')

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

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

router.post('/create', productHelpers.validateProduct, (req, res) => {
    // // Callback example
    // productService.create(req.body, (err)=>{
    //     if(err){
    //         return res.status(500).end()
    //     }
    //     res.redirect('/products');
    // })

    // Promise example

    productService.create(req.body)
        .then(() => res.redirect('/products'))
        .catch(() => res.status(500).end())

});

router.get('/details/:productId', async (req, res) => {
    let product = await productService.getOneWithAccessories(req.params.productId)

    res.render('details', { title: 'Product details', product });
});

router.get('/:productId/attach', async (req, res) => {

    let product = await productService.getOne(req.params.productId);
    let accessories = await accessoryService.GetAllExcept(product.accessories);

    // console.log(product.accessories);
    // console.log(accessories);

    res.render('attachAccessory', { product, accessories })
});

router.post('/:productId/attach', (req, res) => {
    //console.log(req.body);
    productService.attachAccessory(req.params.productId, req.body.accessory)
    .then(() => res.redirect(`/products/details/${req.params.productId}`))
})

module.exports = router;