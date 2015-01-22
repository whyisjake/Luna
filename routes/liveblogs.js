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
    res.json(liveblog);
  });
};

/*
 * POST a new liveblog
 */
exports.liveblogs.create = function(req, res) {

  // Alright, so, let's figure out the path from the full URL.
  var post_url = req.body.url,
      url = new URL(post_url, true),
      api_url = 'http://api.tumblr.com/v2/blog/' + url.hostname + '/posts/?api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4&notes_info=true';

  request( api_url, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      // Let's parse the JSON response.
      var parsed = JSON.parse(body);

      // Append the blog info onto the posted info.
      req.body.blog = parsed.response.blog;

      // Create a new var to save the to db for conv sake.
      var saved = req.body;

      // And now, save to the database.
      db.liveblogs.save(saved, function(err, doc){

        // Send back the saved doc to the front-end.
        res.json(doc);

      });
    }
  });
};
