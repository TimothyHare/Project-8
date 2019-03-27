const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//My Routes
app.use('/', indexRouter);
app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const error = new Error('Page Not Found - 404') 
  error.status = 404;
  next(error);
});

// error handler
app.use(function(error, req, res, next) {
  // set locals, only providing error in development
  res.locals.error = error;
 res.render('notFound', {error});
});

module.exports = app;
