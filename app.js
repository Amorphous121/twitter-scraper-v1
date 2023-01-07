require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
var chalk = require('chalk');
const config = require('./config');

const indexRouter = require('./routes/index');
const Database = require('./middleware/database');

const app = express();
const port = parseInt(config.port, 10) || 8081;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  Database.connect();

  console.log(chalk.bgRedBright.whiteBright(`
  _____       _ _   _              _____
 |_   _|_ _ _|_| |_| |_ ___ ___   |   __|___ ___ ___ ___ ___ ___ ___
   | | | | | | |  _|  _| -_|  _|  |__   |  _|  _| .'| . | . | -_|  _|
   |_| |_____|_|_| |_| |___|_|    |_____|___|_| |__,|  _|  _|___|_|
                                                    |_| |_|        `));

});