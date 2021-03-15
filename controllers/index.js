const Auth = require('./auth');
const Categorie = require('./categories');
const Product = require('./products');
const Search = require('./search');
const User = require('./user');
const Upload = require('./upload');


module.exports = {
    ...Auth,
    ...Categorie,
    ...Product,
    ...Search,
    ...User,
    ...Upload,
}