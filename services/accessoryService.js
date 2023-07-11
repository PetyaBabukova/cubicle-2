const Accessory = require('../models/Accessory')

function create(data){
let accessory = new Accessory(data)

return accessory.save()
}

function getAll() {
    return Accessory.find().lean()
}

function GetAllExcept(ids) {
    return Accessory.find({_id: {$nin: ids}}).lean();
}

module.exports = {
    create,
    getAll,
    GetAllExcept,
}