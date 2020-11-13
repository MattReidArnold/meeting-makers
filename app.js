const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');
const withPaging = require('./middlewares/withPaging');

mongoose.connect(keys.mongoDbURI);
require('./models');

require('./initializers/passport');

const authRouter = require('./routes/auth');
const meetingsRouter = require('./routes/meetings');

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(withPaging());

app.use('/auth', authRouter);
app.use('/api/meetings/', meetingsRouter);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like main.js and main.css
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
