const uniqid = require('uniqid');
const Cube = require('../models/Cube');
const fs = require('fs');
const productsData = require('../config/products.json')

function getAll() {
    return productsData;
}

function create(data) {

    let cube = new Cube(
        uniqid(), 
        data.name, 
        data.description, 
        data.imageUrl, 
        data.difficultyLevel
        );

        productsData.push(cube)
        fs.writeFile(__dirname + '/../config/products.json', JSON.stringify(productsData), (err)=>{ //absolute path is needed
            if(err){
                console.log(err);
                return;
            }

        })

};

module.exports = {
    create,
}