const Auth = require('./auth');
const Categorie = require('./categories');
const Product = require('./products');
const Search = require('./search');
const User = require('./user');


module.exports = {
    ...Auth,
    ...Categorie,
    ...Product,
    ...Search,
    ...User
}