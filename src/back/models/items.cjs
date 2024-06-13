const mongoose = require('mongoose');

const itemsSchema = new mongoose.Schema({
    name: String,
    description:String,
    image: String 

});     

const itemModel = (module.exports = mongoose.model('Item', itemsSchema));

module.exports =  itemModel;