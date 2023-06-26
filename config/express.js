const express = require('express');
const exphbs = require('express-handlebars');

function setupExpress(app, exphbs) {

    app.engine('hbs', exphbs({
        extname: 'hbs'
    }));
  
    app.set('view engine', 'hbs');
    
    app.use(express.static('public'));

    app.use(express.urlencoded({
        extended: true
    }));

}

module.exports = setupExpress;