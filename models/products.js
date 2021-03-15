const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
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

    price: {
        type: Number,
        default: 0,

    },

    categorie: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie',
        require: true,
    },

    description: {
        type: String,
    },

    available: {
        type: Boolean,
        default: true,
    },

    img: {
        type: String,
    },

});

ProductSchema.methods.toJSON = function() {
    const { __v, _id, state, ...data } = this.toObject();
    data.id = _id;
    return data;

}

module.exports = model( 'Product', ProductSchema );