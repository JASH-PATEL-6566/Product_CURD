const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ItemSchema = schema({
    name: String,
    date: String,
    quantity: Number,
    price: Number,
})

const Item = new mongoose.model('item', ItemSchema);

module.exports = Item;