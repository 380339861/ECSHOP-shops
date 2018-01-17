var mongoose = require("mongoose")
var Schema = mongoose.Schema;
var Goods = new Schema({
    goodname   : String,
    cargo        : Number,
    brand        : String,
    myprice        : Number,
    waiprice        : Number,
    goodsimg        : String,
    inventory        : Number,
    sales        : Number,
    create_date:{ type: Date, default: Date.now }
});

var UserModel = mongoose.model('goods', Goods);

module.exports = UserModel