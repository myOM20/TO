const express = require('express');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const favicon = require('serve-favicon');

/*
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
*/


const authRoutes = require('./routes/authRoutes');
const authAdminRoutes = require('./routes/authAdminRoutes');
const appRoutes = require('./routes/appRoutes');

dotenv.config();

const app = express();
// app.use(connectLivereload());

const MongoDBURI = process.env.MONGO_URI || 'mongodb://localhost/tourismDB';

mongoose.connect(MongoDBURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('db connected');
});

app.use(
  session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db,
    }),
  })
);

app.use(favicon(path.join(__dirname , 'public' , 'logo.ico')));
/*
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "views"));

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 50);
});
*/



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static(__dirname + '/views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(authRoutes);
app.use(appRoutes);
app.use(authAdminRoutes);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
  console.log('hey last');
  res.status(err.status || 500);
  res.send(err.message);
});

// listen on port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log('Express app listening on port 3000');
});
