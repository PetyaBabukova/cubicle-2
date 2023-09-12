const express = require('express');
const errorHandler = require('./middlewares/errorHandler');

//const mongoose = require('mongoose');

const config = require('./config/config');
const { engine } = require('express-handlebars'); 

const expressConfig = require('./config/express');
const routes = require('./routes');

const app = express();

expressConfig(app, engine);
// require('./config/express')(app, engine); //this is the same like this above

require('./config/mongoose')();

app.use(routes);
app.use(errorHandler);

app.listen(config.PORT, ()=>{
    console.log(`Server is running on port ${config.PORT}...`)
});