const { Router } = require('express');
const validator = require('validator');
//const {check, validationResult} = require('express-validator'); //check is fol all. It`s better to use eaxtly what we need (see in the documentation)
const { body, validationResult, sanitize } = require('express-validator');

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
        // console.log(error);

        res.render('login', { error })
    }

});

// // The same is implemented below. We can put this in other file too - look middlewares/validations.js
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
    //validations.isStrongPasswordMiddleware,
    // body('email', 'Your email is not valid').isEmail().normalizeEmail(),
    // body('password', 'Password too short!').isLength({ min: 5 }), //This automaticaly generates middleware. Ann array of errors is needed here, look below - let errors = validationResult(req)
    // body('username', 'Specify username').notEmpty(),
    //My custom sanitize with a little help from GPT:
    // body('username').trim().customSanitizer(value => {
    //     // Remove whitespace in between
    //     return value.replace(/\s+/g, '');
    // }).toLowerCase(),

    async (req, res) => {
        // console.log(req.body);

        // Validate here - this is also an option. It`s good to be in middleware if we will use the same validation more than once

        const { username, password, repeatPassword } = req.body;

        // //In middleware look above.
        // let isStrongPassword = validator.isStrongPassword(
        //     password, {
        //         minLength: 8,
        //         minLowercase: 1,
        //         minUppercase: 1,
        //         minNumbers: 1,
        //         minSymbols: 1,
        //     });

        if (password !== repeatPassword) {
            return res.render('register', { error: { message: 'Password missmatch' }, username: req.body.username }); //If we put this in try/catch, we should throw, othewise - return
            // throw { message: 'Password missmatch' }; //this line is, if we use this inside try/catch
        };

        // console.log(req.body.email); //After sanitizing
        // console.log(req.body.username); //After sanitizing
        // let errors = validationResult(req); //Here we`ll put errors. this is an array of errrors
        // //console.log(errors);
        // if (errors.errors.length > 0) {
        //     return res.render('register', errors);
        // }

        try {

            // if (!isStrongPassword) {
            //     //return res.render('register', { error: {message: 'You should have strong password!'}, username: req.body.username }); //If we use this outside try/catch, we should throw, othewise - return
            //     throw { message: 'You should have strong password!' }
            // }


            let user = await authService.register({ username, password });
            res.redirect('/auth/login'); //We can put here user object, if we need it

        } catch (err) {
            // We can do switch case for a different types errors
            // console.log(error.message);
            // console.log(error);
            let error = Object.keys(err?.errors).map(x=>({message: err.errors[x].message}))[0];
            res.render('register', { error })
        };

    });

    // //This is sudgestion from GPT:
// router.post('/register', isGuest, async (req, res) => {
//     try {
//       const { username, password, repeatPassword } = req.body;
  
//       if (password !== repeatPassword) {
//         console.log('Password mismatch');
//         return res.render('register', { error: { message: 'Password missmatch' }, username: req.body.username });
//       }
  
//       let errors = validationResult(req);
//       if (errors.errors.length > 0) {
//         console.log('Validation errors:', errors);
//         return res.render('register', errors);
//       }
  
//       let user = await authService.register({ username, password });
//       console.log('User registered:', user);
//       res.redirect('/auth/login');
  
//     } catch (error) {
//       console.log('Error during registration:', error);
//       res.render('register', { error });
//     }
//   });

router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie(COOKIE_NAME);

    res.redirect('/products');
});

module.exports = router;
