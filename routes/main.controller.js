const express = require('express');
const router = express.Router();

const isomorphic = require('isomorphic-fetch');

// Require syntax
const Unsplash = require('unsplash-js').default;
const toJson = require("unsplash-js").toJson;

const unsplash = new Unsplash({
    applicationId:"c6ad557b81c85d869dbf93b70e19fe544e913f6fd880bcd0434d1de94ed64f21",
    secret: "3ca096f517145bf10c398027f1ba389694d71519cfb3587caf863d8fd64d7e14",
    callbackUrl: "http://unsplash-js.herokuapp.com"
});


/* GET home page. */
router.get('/', function(req, res, next) {
    unsplash.photos.getRandomPhoto({ query: "Programming"})
      .then(toJson)
      .then(json => {
          // console.log(json);
          res.render("main.hbs", { randomImageURL: json.urls.regular })
      })
      .catch((err)=>{
          console.log(err.message);
          res.render("main.hbs", { randomImageURL: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9&s=16f0055167b904922796ac61252fca72' })
      });
  // res.render('main');
});

module.exports = router;
