var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/liveblog', function(req, res) {
  res.render( 'liveblog', { title: 'Liveblogs' } );
});

module.exports = router;
