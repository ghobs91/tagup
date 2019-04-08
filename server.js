/////// Server config
const express = require('express'); // import the express package

const server = express(); // creates the server
server.use(express.json());

// Knex config
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);