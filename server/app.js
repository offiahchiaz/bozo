const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');

const schema = require('./schema/schema');

const app = express();
const port = process.env.PORT || 5000;

// allow cros-origin requests
app.use(cors());

mongoose.connect('mongodb://localhost:27017/bozo', {useNewUrlParser: true})
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log(err));

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(port, (err) => {
    if (!err) { console.log(`Server Runing On Port ${port}`); }
});