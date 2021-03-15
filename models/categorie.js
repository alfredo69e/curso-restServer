const { Schema, model } = require('mongoose');

const CategorieSchema = Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        require: true,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },

});

CategorieSchema.methods.toJSON = function() {

    const { __v, _id, state, ...resto } = this.toObject();
    resto.id = _id;
    return resto;

}

module.exports = model( 'Categorie', CategorieSchema );