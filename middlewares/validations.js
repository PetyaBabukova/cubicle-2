const validator = require('validator');


function isStrongPasswordMiddleware(req, res, next){

    let password = req.body.password;
    let isStrongPassword = validator.isStrongPassword(
        password, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        });

        if (!isStrongPassword) {
            return res.render('register', { error: {message: 'You should have strong password!'} }); //If we use this outside try/catch, we should throw, othewise - return
            //throw { message: 'You should have strong password!'}
        }

        next();
}

module.exports = {
    isStrongPasswordMiddleware,
}