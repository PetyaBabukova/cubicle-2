const express = require('express');

const config = require('./config/config');
const { engine } = require('express-handlebars'); 

const app = express();

app.engine('hbs', engine({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.render('home', {layout: false})
});

app.listen(config.PORT, ()=>{
    console.log(`Server is running on port ${config.PORT}...`)
});