/////// Server config
const express = require('express'); // import the express package

const server = express(); // creates the server
server.use(express.json());

// Knex config
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);
///////

// List all the records
server.get('/api/list', (req, res) => {
  db("restaurants").then(restaurants => {
    res.status(200).json(restaurants);
    console.log('GET request complete')
  }).catch(error => {
      res.status(500).json({ error: "Error retrieving restaurants", info: error })
  });
});