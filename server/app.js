const express = require('express');
const graphqlHTTP = require('express-graphql');

const schema = require('./schema/schema');

const app = express();
const port = process.env.PORT || 5000;

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(port, (err) => {
    if (!err) { console.log(`Server Runing On Port ${port}`); }
});