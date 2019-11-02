// ./app.js

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');
const routes = require('./routes/route');
const { secret } = require('./config');

require("dotenv").config({
  path: path.join(__dirname, ".env")
});

const app = express();
const cors = require('cors');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"client/build")));
app.use(cors());

// Collects the accessToken from the request
app.use(async (req,res,next) => {
  if(req.headers["x-access-token"]) {
    try {
      const accessToken = req.headers["x-access-token"];
      const { serverId } = jwt.verify(accessToken, secret);
      res.locals.loggedInServerId = serverId;
      next();
    } catch(error){
      if(error.name === 'TokenExpiredError')
        res.status(401).json({error: "Your session has expired. Please login again."});
      else
        next(error); 
    }
  } else {
    next();
  }
})

app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if(req.app.get('env')) console.log(res.locals.error);
  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;