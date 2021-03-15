const { request, response } = require("express");
const { ObjectId } = require('mongoose').Types;

const { User, Product, Categorie } = require('../models');

const colectionPermitidas = [
    'user',
    'categorie',
    'product',
    'role'
]


const search = ( req = request, res = response ) => {

    try {

        const { colection, finish } = req.params;

        if( !colectionPermitidas.includes(colection) ) {
            return res.status(400).json({
                msg: `Las Colecciones permitidas son: ${ colectionPermitidas }`
            });
        }

        switch ( colection ) {
            case 'user':
                searchUser(finish, res);
                break;
            case 'categorie':
                searchCategorie(finish, res);
                break;
            case 'product':
                searchProdcuts(finish, res);
                
                break;
            case 'role':
                
                break;
        
            default:
               return res.status(500).json({
                    msg: 'Se me olvido hacer esta busqueda'
                });
               
        }


        // res.json({
        //     colection,
        //     finish
        // });
        
    } catch (err) {
        console.log('search err ', err);
        return res.status(500).json({
            msg: `Ocurrio un Error Hable con el Admin`
        });
    }

    

}


const searchUser = async ( finish = '', res = response ) => {

    try {

        const isMongoID = ObjectId.isValid( finish  );

        if( isMongoID ) {
            const user = await User.findById( finish );
            return res.json({ 
                results: [
                    ( user ) ? user : []
                ]
             });
            
        }

        const regex = new RegExp(finish, 'i');

        const user = await User.find({ 
            $or: [
                { name: regex },
                { email: regex}
            ],
            $and: [
               { state: true }
            ]
         });


        return res.json({ 
                results: user
         });

        
    } catch (err) {
        console.log('search err ', err);
        return res.status(500).json({
            msg: `Ocurrio un Error Hable con el Admin`
        });
    }

}

const searchProdcuts = async ( finish = '', res = response ) => {

    try {

        const isMongoID = ObjectId.isValid( finish  );

        if( isMongoID ) {
            const product = await Product.findById( finish ).populate('categorie', 'name').populate('user', 'name');
            return res.json({ 
                results: [
                    ( product ) ? product : []
                ]
             });
            
        }

        const regex = new RegExp(finish, 'i');

        const product = await Product.find({ 
            $or: [
                { name: regex }
            ],
            $and: [
               { state: true }
            ]
         }).populate('categorie', 'name')
         .populate('user', 'name');


        return res.json({ 
                results: product
         });

        
    } catch (err) {
        console.log('search err ', err);
        return res.status(500).json({
            msg: `Ocurrio un Error Hable con el Admin`
        });
    }

}

const searchCategorie = async ( finish = '', res = response ) => {

    try {

        const isMongoID = ObjectId.isValid( finish  );

        if( isMongoID ) {
            const categorie = await Categorie.findById( finish );
            return res.json({ 
                results: [
                    ( categorie ) ? categorie : []
                ]
             });
            
        }

        const regex = new RegExp(finish, 'i');

        const categorie = await Categorie.find({ 
            $or: [
                { name: regex }
            ],
            $and: [
               { state: true }
            ]
         });


        return res.json({ 
                results: categorie
         });

        
    } catch (err) {
        console.log('search err ', err);
        return res.status(500).json({
            msg: `Ocurrio un Error Hable con el Admin`
        });
    }

}

module.exports = {
    search
}