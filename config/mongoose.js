const mongoose = require('mongoose')

module.exports = ()=>{
mongoose.connect('mongodb://localhost/cubicle', {useNewUrlParser: true, useUnifiedTopology: true, family: 4,  });

const db = mongoose.connection;
db.on('error', () => {console.error('connection error: ')});
db.once('open',()=> {console.log('DB connected!')});
}



