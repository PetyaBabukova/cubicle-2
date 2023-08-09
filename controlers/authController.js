const { Router } = require('express');
const validator = require('validator');

const authService = require('../services/authService');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');
const validations = require('../middlewares/validations'); //If this is in other file

const { COOKIE_NAME } = require('../config/config')

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

// // Serverside validation. The same is implemented below as clientside below. We can put this in other file - look middlewares/validations.js
// const isStrongPasswordMiddleware = (req, res, next)=>{

//     let password = req.body.password;
//     let isStrongPassword = validator.isStrongPassword(
//         password, {
//             minLength: 8,
//             minLowercase: 1,
//             minUppercase: 1,
//             minNumbers: 1,
//             minSymbols: 1,
//         });

//         if (!isStrongPassword) {
//             return res.render('register', { error: {message: 'You should have strong password!'} }); //If we use this outside try/catch, we should throw, othewise - return
//             //throw { message: 'You should have strong password!'}
//         }

//         next();
// }; 
    

router.post(
    '/register',
    isGuest,
    validations.isStrongPasswordMiddleware,
    async (req, res) => {
        console.log(req.body);

        // Validate here - this is also an option. It`s good to be in middleware if we will use the same validation more than once

        const { username, password, repeatPassword } = req.body;

        // //Clientside validation. Look for the Serverside validation (in middleware) above.
        // let isStrongPassword = validator.isStrongPassword(
        //     password, {
        //         minLength: 8,
        //         minLowercase: 1,
        //         minUppercase: 1,
        //         minNumbers: 1,
        //         minSymbols: 1,
        //     });
            
            if (password !== repeatPassword) {
                return res.render('register', { error: {message: 'Password missmatch'} }); //If we put this in try/catch, we should throw, othewise - return
                // throw { message: 'Password missmatch' }; //this line is, if we use this inside try/catch
            };
            
            try {
                
                if (!isStrongPassword) {
                    //return res.render('register', { error: {message: 'You should have strong password!'} }); //If we use this outside try/catch, we should throw, othewise - return
                    throw { message: 'You should have strong password!'}
                }
                
           
            let user = await authService.register({ username, password });
            res.redirect('/auth/login'); //We can put here user object, if we need it

        } catch (error) {
            // We can do switch case for a different types errors
            res.render('register', { error })
        };

    });

router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie(COOKIE_NAME);

    res.redirect('/products');
});

module.exports = router;
