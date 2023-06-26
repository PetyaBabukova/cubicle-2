const { Router } = require('express');
const router = Router();

//Method notation sintaxys - thes could be written as anonimus func, arrow func, etc.
router.get('/', (req, res) => {
    res.render('home');
});

router.get('/create', (req, res) => {
    res.render('create');
})




module.exports = router;