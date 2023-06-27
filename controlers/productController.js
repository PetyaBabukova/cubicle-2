const { Router } = require('express');
const productService = require('../services/productService')
const productHelpers = require('./helpers/productHelpers')

const router = Router();

//Method notation sintaxys - thes could be written as anonimus func, arrow func, etc.
router.get('/', (req, res) => {

    let products = productService.getAll();
    res.render('home', { title: 'Browse', products });
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
    .then(()=> res.redirect('/products'))
    .catch(()=> res.status(500).end())

});

router.get('/details/:productId', (req, res) => {
    let product = productService.getOne(req.params.productId)
    console.log(req.params.productId);
    console.log(req.params);
    res.render('details', { title: 'Product details', product });
});






module.exports = router;