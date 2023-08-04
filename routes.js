const{ Router } = require('express');
const productController = require('./controlers/productController');
const accessoryController = require('./controlers/accessoryController')
const homeController = require('./controlers/homeController');
const authController = require('./controlers/authController');

const isAuthenticated = require('./middlewares/isAuthenticated');
const isGuest = require('./middlewares/isGuest');


const router = Router();

router.use('/', homeController);
router.use('/auth',  authController);
router.use('/products', productController);
router.use('/accessories', accessoryController);

router.get('*', (req, res)=>{
    res.render('404')
});


module.exports = router;