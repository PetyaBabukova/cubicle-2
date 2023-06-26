const { Router } = require('express');
const productService = require('../services/productService')

const router = Router();

//Method notation sintaxys - thes could be written as anonimus func, arrow func, etc.
router.get('/', (req, res) => {
    res.render('home', { title: 'Browse' });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

router.post('/create', (req, res) => {
    // TODO: Validations!!! 

    productService.create(req.body)
    
    res.redirect('/products');
});

router.get('/details/:productId', (req, res) => {
    res.render('details', { title: 'Product details' });
});




module.exports = router;