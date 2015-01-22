var db = require("../database.js");

exports.index = function(req, res) {
  db.liveblogs.find().toArray(function(err, liveblogs) {
    res.render('index', {
      liveblogs: liveblogs,
      title: 'Luna'
    });
  });
};

// Let's start the liveblogs.
exports.liveblogs = {};
/*
 * GET all liveblogs
 */
exports.liveblogs.all = function(req, res) {
   db.liveblogs.find( function(err, liveblog) {
    res.json(liveblog);
  });
};

/*
 * GET one liveblog
 */
exports.liveblogs.one = function(req, res) {
  db.liveblogs.findOne({ "_id" : db.ObjectId(req.params.id) }, function(err, liveblog) {
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
