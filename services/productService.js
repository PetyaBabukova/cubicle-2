const uniqid = require('uniqid');
const Cube = require('../models/Cube');
const fs = require('fs');
const productsData = require('../config/products.json');
const path = require('path');

function getAll() {
    return productsData;
};

function getOne(id) {
    return productsData.find(x => x.id == id);
  
};

function create(data) {

    let cube = new Cube(
        uniqid(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel
    );

    productsData.push(cube)
    //fs.writeFile(__dirname + '/../config/products.json', JSON.stringify(productsData), (err) => { //absolute path is needed
        fs.writeFile(path.join(__dirname , '../config/products.json'), JSON.stringify(productsData), (err) => { //using path
        if (err) {
            console.log(err);
            return;
        }

    });



};

module.exports = {
    getAll,
    getOne,
    create,
}