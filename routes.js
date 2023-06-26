const{ Router } = require('express');
const productController = require('./controlers/productController');
const aboutController = require('./controlers/aboutController')

const router = Router();

router.use('/about', aboutController);
router.use('/', productController);

router.get('*', (req, res)=>{
    res.render('404')
})


module.exports = router;