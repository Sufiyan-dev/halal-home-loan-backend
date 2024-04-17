/* eslint-disable no-undef */
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const logger = require( './src/api/logger/index.js');
const apiRoutes = require( "./src/api/routes/index.js") ;

dotenv.config();

const app = express();

// req input phraser
app.use(express.json());

app.use(cors({
    origin: '*'
  }));

app.use(apiRoutes);


app.get('/', (req, res) => {
    res.send('Hey');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
    logger.info(`App listening to http://localhost:${PORT}`)
);