require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const middlewares = require('./middlewares');
const users = require('./users');

const app = express();

app.use(morgan('common', {
  stream: fs.createWriteStream('./access.log', { flags: 'a' })
}));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use('/api/users', users);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
