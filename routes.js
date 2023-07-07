const{ Router } = require('express');
const productController = require('./controlers/productController');
const accessoryController = require('./controlers/accessoryController')
const homeController = require('./controlers/homeController')

const router = Router();

router.use('/', homeController);
router.use('/products', productController);
router.use('/accessories', accessoryController)

router.get('*', (req, res)=>{
    res.render('404')
});


module.exports = router;