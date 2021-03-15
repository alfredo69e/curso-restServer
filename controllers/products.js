const { request, response } = require("express");
const { Product } = require("../models");


const productCreate = async ( req = request, res = response ) => {


    try {

        const { state, user, name, ...body  } = req.body;

        name.toUpperCase();

        const productDB = await Product.findOne({ name });

        if ( productDB ) {
            return res.status(400).json({
                msg: `El Producto ${ productDB.name } ya existe`
            });
        }

        // Generar la data a guardar
        const data = {
            ...body,
            name: name.toUpperCase(),
            user: req.user._id
        }


        const product = new Product( data );

        await product.save();

        res.status(201).json( product );
        
    } catch (err) {
        console.log('categoriesCreate err ', err);
        return res.status(500).json({
            msg: `Ocurrio un Error Hable con el Admin`
        });
    }
    

};


const products = async ( req = request, res = response ) => {

    try {

        const { limit = 5, desde = 0 } = req.query;
    
        const query = { state: true }
    
        const [ total, categories ] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
            .populate('user', 'name')
            .populate('categorie', 'name')
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

}

const productId = async ( req = request, res = response ) => {

    try {

        const { id } = req.params;

        const product = await Product.findById( id );

        if (  !product.state ) {
            return res.status(400).json({
                msg: `El Producto ${ product.name } no Exite`
            });
        }

        const data = {
            name: product.name,
            available: product.available,
            price: product.price
        }

        return res.json(data)
        
    } catch (err) {
        console.log('categoriesCreate err ', err);
        return res.status(500).json({
            msg: `Ocurrio un Error Hable con el Admin`
        });
    }

}

const productUpdate = async ( req = request, res = response ) => {

    try {

        const { name } = req.body;

        name.toUpperCase();

        const { id } = req.params;

        const nameExist = await Product.findOne({ name });

        if ( nameExist  ) {
            return res.status(400).json({
                msg: `EL Producto ${ nameExist.name } ya existe`
            });
        }

        const validate = await Product.findById( id );

        if ( !validate.state ) {
            return res.status(400).json({
                msg: `EL Producto ${ validate.name } esta bloqueada`
            });
        }

    const product = await Product.findByIdAndUpdate( id, { name }, { new: true } );

    return res.json( product );
        
    } catch (err) {
        console.log('categories err ', err);
        return res.status(500).json({
            msg: `Ocurrio un Error Hable con el Admin`
        });
    }

}


const productDelete = async ( req = request, res = response ) => {

    try {

        const { id } = req.params;
        const product = await Product.findByIdAndUpdate( id, { state: false }, { new: true } );
        return res.json(product);
        
    } catch (err) {
        console.log('categoriesDetele err ', err);
        return res.status(500).json({
            msg: `Ocurrio un Error Hable con el Admin`
        });
    }

}




module.exports = {
    productCreate,
    products,
    productId,
    productDelete,
    productUpdate
}