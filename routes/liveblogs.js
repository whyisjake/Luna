var URL = require('url-parse');
var db = require("../database.js");
var request = require('request');

// Throw DB errors.
db.on('error',function(err) {
    console.log('database error', err);
});

exports.index = function(req, res) {
  db.site.findOne(function(err, site) {
    db.liveblogs.find().toArray(function(err, liveblogs) {
      res.render('index', {
        liveblogs: liveblogs,
        site: site
      });
    });
  });
};

exports.admin = function(req, res) {
  db.site.findOne(function(err, site) {
    res.render('admin', {
      site: site,
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

  // Find the API key on the site collection
  db.site.findOne(function(err, doc) {

      var key = doc.apiKey;

      // Alright, so, let's figure out the path from the full URL.
      var post_url = req.body.url,
          url = new URL(post_url, true),
          api_url = 'http://api.tumblr.com/v2/blog/' + url.hostname + '/posts/?api_key=' + key + '&notes_info=true';

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

  });

};

// Let's start the post.
exports.post = {};
/*
 * GET all post
 */
exports.post.all = function(req, res) {
  db.post.find().limit(20).sort( { id: -1 } ).toArray(function(err, post) {
    res.json(post);
  });
};

exports.post.site = function(req, res) {
  console.log( req.params.site );
  db.post.find({ blog_name: req.params.site }).limit(200).sort( { id: -1 } ).toArray(function(err, post) {
    res.json(post);
  });
};

/*
 * GET 20 posts, offset by some.
 */
exports.post.offset = function(req, res) {
  db.post.find().limit(20).skip( req.params.num, function(err, post) {
    res.json(post);
  });
};

/*
 * GET one post
 */
exports.post.one = function(req, res) {
  db.post.findOne({ "_id" : db.ObjectId(req.params.id) }, function(err, post) {
    res.json(post);
  });
};