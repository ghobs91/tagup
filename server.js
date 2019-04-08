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

// Read a specific record
server.get('/api/read/:id', (req, res) => {
  const { id } = req.params;
  db('restaurants')
    .where({ id })
    .then(restaurant => {
      res.status(200).json(restaurant);
      console.log('GET request by ID complete')
    }).catch(error => {
        res.status(500).json({ error: "Error retrieving restaurants", info: error })
    });
});

// Create a record
server.post('/api/create', (req, res) => {
  const restaurant = req.body;

  db.insert(restaurant)
    .into('restaurants')
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// Update a specific record
server.put('/api/modify/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('restaurants')
    .where({ id })
    .update(changes)
    .update({
      lastModificationDate: Date.now()
    })
    .then(count => {
      // count === number of records updated
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// Delete a specific record
server.delete('/api/remove/:id', (req, res) => {
  const { id } = req.params;
  db('restaurants')
    .where({ id })
    .del()
    .then(count => {
      // count === number of records deleted
      res.status(200).json(count);
      console.log("DELETE request complete")
    })
    .catch(err => {
      res.status(500).json(err);
    });
});