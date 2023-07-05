const fs = require('fs/promises');
const path = require('path');
const productsDb = require('../config/products.json');

class Cube {

    constructor(id, name, description, imageUrl, level){
        this.id = id
        this.name = name
        this.description = description
        this.imageUrl = imageUrl
        this.level = level
    }

    save(){
        productsDb.push(this);

        return fs.writeFile(
            path.join(__dirname, '../config/products.json'),
            JSON.stringify(productsDb),
        );
    }

    static getAll(){
        return productsDb;
    };

    static getOne(id){
        return productsDb.find(x => x.id == id)
    }
}

module.exports = Cube;