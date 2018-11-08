const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const { mongoURI } = require('./config/keys');

const app = express();

// Allow cross origin requests
app.use(cors());

// Connect to the database
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true }
);

mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log('now listening for requests on port 4000');
});
