// DEV URL
var dbUrl = "liveblog";

var collections = ["liveblogs", "site", "post"];

var db = require("mongojs").connect(dbUrl, collections);
module.exports = db;
