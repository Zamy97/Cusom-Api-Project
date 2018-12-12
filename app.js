const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const rjwt = require('restify-jwt-community');

const genresRouter = require('./routes/genres.controller.js');
const bookRouter = require('./routes/book.controller.js');
const mainRouter = require('./routes/main.controller.js');
const customerRouter = require('./routes/customers.controller.js');
const userRoute = require('./routes/users.controller.js');
const documentationRouter = require('./routes/documentation.controller.js');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Protect routes
app.use(rjwt({ secret: 'secret1' }).unless({ path: ['/','/api/auth', '/api/register', '/api/documentation'] }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Forwards any requests to the /msin URI to our albums Router
app.use('/', mainRouter);
app.use('/', genresRouter);
app.use('/', bookRouter);
app.use('/', customerRouter);
app.use('/', userRoute);
app.use('/', documentationRouter);

// Connect to mongodb
mongoose.connect('mongodb://user1:password1@ds129454.mlab.com:29454/cutom-api-2',{ useNewUrlParser: true })


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// https://stackoverflow.com/questions/44510055/failed-to-connect-to-mlab-by-mongo
// https://www.freecodecamp.org/forum/t/i-need-help-connecting-to-mlab-com-database-and-importing-data/179879
// http://jasonwatmore.com/post/2018/08/06/nodejs-jwt-authentication-tutorial-with-example-api
// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
// http://jasonwatmore.com/post/2018/08/06/nodejs-jwt-authentication-tutorial-with-example-api
// https://hackernoon.com/restful-api-design-with-node-js-26ccf66eab09
// https://www.youtube.com/watch?v=eB9Fq9I5ocs&t=250s
// https://www.youtube.com/watch?v=bqn-sx0v-l0&t=52s
// https://mlab.com/databases/cutom-api-2
// https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
// https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client
// https://github.com/bradtraversy/bookstore/tree/master/client
// https://github.com/bradtraversy/restify_customer_api
// https://github.com/auth0/express-jwt
// https://medium.com/front-end-hacking/learn-using-jwt-with-passport-authentication-9761539c4314
// https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router
