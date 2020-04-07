require('dotenv').config();
const express = require('express');

const app = express();
const port = 3000;

const api = require('./api');

app.use('/api/', api);

app.listen(port, () => console.log(`Running on ${port}!`));
