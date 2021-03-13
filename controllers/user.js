const { respnse, request } = require('express');
const { encodePass } = require('../helpers/encryptarPass');
const User = require('../models/user/user');




const userGet = async (req = request, res = respnse) => {

    const { limit = 2, desde = 0 } = req.query;
    
    const query = { state: true }

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query).skip(Number(desde)).limit(Number(limit))
    ]);

    res.status(200).json({
        total,
        users
    });

};

const userPost = async (req = request, res = respnse) => {
    const { name, email, password, role  } = req.body;
    const user = new User({
        name,
        email,
        password,
        role,
    });

    user.password = await encodePass( password );

    // Guardar en BD
    await user.save();

    res.status(200).json({
        user,
    });

};

const userPut = async(req = request, res = respnse) => {

    const { id } = req.params;
    const { password, google, email, _id, ...resto  } = req.body;

    // TODO: validar contra base de datos
    if ( password ) {
        resto.password = await encodePass( password );
    }

    const user = await User.findByIdAndUpdate( id, resto );

    res.status(200).json(user);
};

const userDelete = async(req = request, res = respnse) => {

    const { id } = req.params;

    // Delete Fisicamente
    // const user = await User.findByIdAndDelete( id );

    const user = await User.findByIdAndUpdate( id, { state: false } );
    res.status(200).json(user);
};

const userPatch = (req = request, res = respnse) => {
    res.status(200).json({
        msg: 'userPatch -  controlador'
    });
};

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
}