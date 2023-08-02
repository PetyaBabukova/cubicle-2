const { Router } = require('express');
const authService = require('../services/authService');

const router = Router();
// const router = require('express').Router();

router.get('/login', (req, res)=>{
    res.render('login');
});

router.get('/register', (req, res)=>{
    res.render('register');
});

router.post('/register', async (req, res)=>{
    //console.log(req.body);

    try {
        await authService.register(req.body);
        res.redirect('/products');
        
    } catch (error) {
        res.render('register', {error})
    } 
    
});

module.exports = router;
