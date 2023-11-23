const express = require('express');
const router = require('./routes/router');
const cors = require('cors');
const conn = require('./db/conn');
const app = express();

conn()
app.use(cors());
app.use(express.json());
app.use('/api', router);

module.exports = app;