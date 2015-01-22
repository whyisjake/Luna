// DEV URL
var dbUrl = "liveblog";

var collections = ["liveblogs", "site"];

var db = require("mongojs").connect(dbUrl, collections);
module.exports = db;
