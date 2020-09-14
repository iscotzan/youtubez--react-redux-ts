const {mongoURL} = require('./../config')
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = mongoURL;
db.favorite = require("./schema/favorite.model")(mongoose);

module.exports = db;