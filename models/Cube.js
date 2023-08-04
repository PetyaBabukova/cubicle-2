const mongoose = require('mongoose');


const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true,
        maxlenght: 50,
    },

    imageUrl: {
        type: String,
        required: true,
        // validate: /^https?/,
        // //error message?
    },

    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },

    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }], 

    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }, 

});

// Here we can add different methods etc.

module.exports = mongoose.model('Cube', cubeSchema);




// // // The old model
// const Model = require('./Model');
// const productsDb = require('../config/products.json');

// class Cube extends Model {
    
    //     constructor(id, name, description, imageUrl, level) {
        //         this.id = id
        //         this.name = name
        //         this.description = description
        //         this.imageUrl = imageUrl
        //         this.level = level
        //     }
        
        
        
        
        // }
       // module.exports = Cube;