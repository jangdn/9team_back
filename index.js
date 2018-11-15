const express = require('express');
const cors = require('cors');
const http = require('http');
const logger = require('morgan');
const categories = require('./routes/categories')
const items = require('./routes/items')

const app = express();
const PORT = 8080;

app.set('port', PORT);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/categories', categories);
app.use('/api/items', items);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ success: false });
});

const server = http.createServer(app);
server.listen(PORT);
