"use strict";
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const rfs = require('rotating-file-stream');
const fs = require('fs');
const helmet = require('helmet');
const compression = require('compression');
const session = require("express-session");
const bodyParser = require('body-parser');
// const util = require("util");
// const redis = require('redis');

console.log("Setting up project");
(async () => {
  try{
  await require("./getTrainData")();
console.log("Project settings done");
  
  } catch(error) {
    console.log(error);
  }
})();

const logDirectory = path.join(__dirname, 'logs');
const indexRouter = require('./routes/index');


// const redis_Client = redis.createClient({host: "redis-15359.c228.us-central1-1.gce.cloud.redislabs.com", port: "15359", password: "vpz6O15TOOUwofDpCWaFELjnP1X1msil", db: "trialdb-iconnect", socket_keepalive: true});

const app = express();
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory,
    compress: true
});
const fileLogger = logger('[:response-time] :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', {
    stream: accessLogStream,
});
app.use(fileLogger);
app.use(logger('dev'));
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    secret: "Let's Verify Certificates",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30
    },
    resave: true,
    saveUninitialized: true
  }));


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);


module.exports = {app: app, logger: fileLogger};
