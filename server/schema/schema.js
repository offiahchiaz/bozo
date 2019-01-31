const graphql = require('graphql');
const _ = require('lodash');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLInt,
    GraphQLID,
} = graphql;

let books = [
    {name: 'Poker', genre: 'Fantasy', id: '1', authorId: '3'},
    {name: 'Xamp', genre: 'Programming', id: '2', authorId: '1'},
    {name: 'The Willer', genre: 'Poetry', id: '3', authorId: '2'},
    {name: 'The Hero', genre: 'Poetry', id: '4', authorId: '3'},
    {name: 'Miracle Colour', genre: 'Fantasy', id: '5', authorId: '2'},
    {name: 'Fantastic Light', genre: 'Poetry', id: '6', authorId: '3'}
];
let authors = [
    {name: 'Bomba Koliu', age: 44, id: '1'},
    {name: 'Dimgba Okirie', age: 42, id: '2'},
    {name: 'Florence Ita-Giwa', age: 66, id: '3'}
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent);  
                return _.find(authors, {id: parent.authorId});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, {authorId: parent.id});
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return _.find(books, {id: args.id});
            } 
        },
        author: {
            type: AuthorType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                return _.find(authors, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});