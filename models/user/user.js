const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true,
    },

    password: {
        type: String,
        require: true,
    },

    img: {
        type: String,
    },

    role: {
        type: String,
        require: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },

    state: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    },

});

UserSchema.methods.toJSON = function() {

    const { __v, password, ...user } = this.toObject();
    return user;

}

module.exports = model( 'User', UserSchema );