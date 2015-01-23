var db = require("../database.js");
var URL = require('url-parse');
var request = require('request');

//Let's start by grabbing the most recent content on the site, and get the count of the posts.

// Find the API key on the site collection
db.site.findOne(function(err, doc) {

  var key = doc.apiKey;

  // Alright, so, let's figure out the path from the full URL.
  var post_url = 'http://topgear.tumblr.com/',
      url = new URL(post_url, true),
      api_url = 'http://api.tumblr.com/v2/blog/' + url.hostname + '/posts/?api_key=' + key + '&notes_info=true';

  request( api_url, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      // Let's parse the JSON response.
      var parsed = JSON.parse(body);
      var count = parsed.response.total_posts,
          times = Math.ceil( count / 20 );

      console.log( 'Posts found: ' + count );
      console.log( 'Need to loop: ' + times );

      for ( var i = times - 1; i >= 0; i-- ) {
        // Let's add the offset to the URL.
        // #orderofoperations
        // BTW, I don't like concatenating with math operators.
        var new_url = api_url + '&offset=' + i * 20;

        request( new_url, function( error, response, body ) {
          if (!error && response.statusCode == 200) {
            // Parse it all.
            var parsed = JSON.parse( body );
            for (var i = parsed.response.posts.length - 1; i >= 0; i--) {
              db.post.update(
                 {id: parsed.response.posts[i].id },
                 {$set:parsed.response.posts[i] },
                 {upsert: true}
              );
            }
          }
        });
      }
    }
  });
});