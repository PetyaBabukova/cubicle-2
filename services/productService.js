const uniqid = require('uniqid');
const Cube = require('../models/Cube');
const fs = require('fs/promises');
const productsData = require('../config/products.json');
const path = require('path');

function getAll() {
    return productsData;
};

function getOne(id) {
    return productsData.find(x => x.id == id);

};

//TODO - make this with promise
function create(data, callback) { //old fasion JS method with async callback

    let cube = new Cube(
        uniqid(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel
    );

    productsData.push(cube)
    //fs.writeFile(__dirname + '/../config/products.json', JSON.stringify(productsData), (err) => { //absolute path is needed
    // // old fasion JS method with async callback example
    // fs.writeFile(
    //     path.join(__dirname, '../config/products.json'), //using path
    //     JSON.stringify(productsData),
    //     callback
    // );

return fs.writeFile(
    path.join(__dirname, '../config/products.json'), //using path
    JSON.stringify(productsData),
)

};

module.exports = {
    getAll,
    getOne,
    create,
}