const { response, request } = require("express");
const { Categorie } = require('../models');

// Optener las catgorias
const categories = async ( req = request, res = response ) => {

    try {

        const { limit = 5, desde = 0 } = req.query;
    
        const query = { state: true }
    
        const [ total, categories ] = await Promise.all([
            Categorie.countDocuments(query),
            Categorie.find(query)
            .populate('user', 'name',)
            .skip(Number(desde))
            .limit(Number(limit)),

        ]);
    
        res.status(200).json({
            total,
            categories
        });
        
    } catch (err) {
        console.log('categories err ', err);
        return res.status(500).json({
            msg: `Ocurrio un Error Hable con el Admin`
        });
    }
    

};



const categoriesSearch = async ( req = request, res = response ) => {

    try {

        const { id } = req.params;

        const categorie = await Categorie.findById( id );

        if (  !categorie.state ) {
            return res.status(400).json({
                msg: `La Categoria ${ categorie.name } no Exite`
            });
        }


        return res.json(categorie)
        
    } catch (err) {
        console.log('categoriesCreate err ', err);
        return res.status(500).json({
            msg: `Ocurrio un Error Hable con el Admin`
        });
    }

};

const categoriesCreate = async ( req = request, res = response ) => {


    try {

        const { name } = req.body;

         name.toUpperCase();

        const categorieDB = await Categorie.findOne({ name });

        if ( categorieDB ) {
            return res.status(400).json({
                msg: `La Categoria ${ categorieDB.name } ya existe`
            });
        }

        // Generar la data a guardar
        const data = {
            name: name,
            user: req.user._id
        }


        const categorie = new Categorie( data );

        await categorie.save();

        res.status(201).json( categorie );
        
    } catch (err) {
        console.log('categoriesCreate err ', err);
        return res.status(500).json({
            msg: `Ocurrio un Error Hable con el Admin`
        });
    }
    

};


const categoriesUpdate = async ( req = request, res = response ) => {

   try {

    const { name } = req.body;

    name.toUpperCase();

    const { id } = req.params;

    const nameExist = await Categorie.findOne({ name });

    if ( nameExist  ) {
        return res.status(400).json({
            msg: `La Categoria ${ nameExist.name } ya existe`
        });
    }

    const validate = await Categorie.findById( id );

    if ( !validate.state ) {
        return res.status(400).json({
            msg: `La Categoria ${ validate.name } esta bloqueada`
        });
    }

    const categorie = await Categorie.findByIdAndUpdate( id, { name }, { new: true } );

    return res.json( categorie );
       
   } catch (err) {
        console.log('categoriesDetele err ', err);
        return res.status(500).json({
            msg: `Ocurrio un Error Hable con el Admin`
        });
   }

};


const categoriesDetele = async ( req = request, res = response ) => {

    try {

        const { id } = req.params;

        const categorie = await Categorie.findByIdAndUpdate( id, { state: false }, {new: true} );

        return res.json(categorie);
        
    } catch (err) {
        console.log('categoriesDetele err ', err);
        return res.status(500).json({
            msg: `Ocurrio un Error Hable con el Admin`
        });
    }

    

   

};

module.exports = {
    categories,
    categoriesCreate,
    categoriesSearch,
    categoriesDetele,
    categoriesUpdate
}