const app = require('express')();
const express = require('express');

var http = require('http').Server(app);
var io = require('socket.io')(http);
const config = require("./config")

const cors = require('cors');
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');

const Socket = require('./socket')

const MONGODB_URI = config.mongoUrl;

const router = require('./routes/router')
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(express.static('uploads'));

app.use('/public', express.static('public'));

app.use(cors())

Socket.init(io);


app.use('/', router.init());

mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(result => {
    http.listen(port, () => {
      console.log('App is Running on ' + port );

    });
  })
  .catch(err => {
    console.log(err);
  });
