const { Router } = require('express');
const authService = require('../services/authService');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

const {COOKIE_NAME} = require('../config/config')

const router = Router();
// const router = require('express').Router();

router.get('/register', isGuest, (req, res) => {
    res.render('register');
});

router.get('/login', isGuest, (req, res) => {
    res.render('login');
});

router.post('/login', isGuest, async (req, res) => {
    const { username, password } = req.body;

    try {
        let token = await authService.login({ username, password });
        //console.log(token);
        res.cookie(COOKIE_NAME, token);
        res.redirect('/products');

    } catch (error) {
        console.log(error);

        res.render('login', { error })
    }

});

router.post('/register', isGuest, async (req, res) => {
    //console.log(req.body);

    // Validate here - this is also an option. It`s good to be in middleware if we will use the same validation more than once
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        res.render('register', { message: 'Password missmatch' });
        return;
    };

    try {
        let user = await authService.register({ username, password });
        res.redirect('/auth/login'); //We can put here user object, if we need it

    } catch (error) {
        // We can do switch case for a different types errors
        res.render('register', { error })
    };

});

router.get('/logout', isAuthenticated, (req, res)=>{
    res.clearCookie(COOKIE_NAME);
    
    res.redirect('/products');
});

module.exports = router;
