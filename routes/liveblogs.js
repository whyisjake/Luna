var db = require("../database.js");

exports.index = function(req, res) {
  res.render('index', {
    title: 'Luna'
  });
};

// Let's start the liveblogs.
exports.liveblogs = {};
/*
 * GET all liveblogs
 */
exports.liveblogs.all = function(req, res) {
  db.liveblogs.find().skip(0).limit(20);
};

/*
 * GET one liveblog
 */
exports.liveblogs.one = function(req, res) {
  db.liveblogs.findOne({ "_id" : db.ObjectId(req.params.id) }, function(err, liveblog) {
    console.log(liveblog);
    if(err) return;
    res.json(liveblog);
  });
};

/*
 * POST a new liveblog
 */
exports.liveblogs.create = function(req, res) {
  db.liveblogs.save(req.body, function(err, doc){
    res.json(doc);
  });
};
