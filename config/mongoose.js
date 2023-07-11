const mongoose = require('mongoose')
const config = require('./config');

module.exports = ()=>{
mongoose.connect(config.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true, family: 4,  });

const db = mongoose.connection;
db.on('error', () => {console.error('connection error: ')});
db.once('open',()=> {console.log('DB connected!')});
}



