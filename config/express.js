const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');

function setupExpress(app, exphbs) {

    app.engine('hbs', exphbs({
        extname: 'hbs'
    }));
  
    app.set('view engine', 'hbs');
    
    app.use(express.static('public'));

    app.use(express.urlencoded({
        extended: true
    }));

    app.use(cookieParser());

    app.use(auth());

}

module.exports = setupExpress;