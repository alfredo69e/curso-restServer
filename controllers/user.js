const { respnse, request } = require('express');


const userGet = (req = request, res = respnse) => {

    const query = req.query

    res.status(200).json({
        msg: 'userGet -  controlador',
        query
    });

};

const userPost = (req = request, res = respnse) => {

    const body = req.body;

    res.status(200).json({
        msg: 'userPost -  controlador',
        body,
    });

};

const userPut = (req = request, res = respnse) => {

    const { id } = req.params;

    res.status(200).json({
        msg: 'userPut -  controlador',
        id
    });

};

const userDelete = (req = request, res = respnse) => {
    res.status(200).json({
        msg: 'userDelete -  controlador'
    });

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