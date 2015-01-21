// DEV URL
var dbUrl = "liveblog";

var collections = ["liveblogs", "updates"];

var db = require("mongojs").connect(dbUrl, collections);
module.exports = db;
