
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config(  process.env.CLOUDINARY_URL );
const { request, response } = require("express");
const { uploads } = require("../helpers");
const { User, Product } = require("../models");



const upload = async (req = request, res = response) => {
  
    try {
    
     const name = await uploads( req.files, undefined, 'imgs' );

     res.json({ name });

    
    } catch (msg) {
        console.log('uploads err ', msg);
        return res.status(400).json({
            msg
        });
    }
}

const uploadUpdate = async (req = request, res = response) => { 

    try {

        const { id, colection } = req.params;

        let model;

        switch ( colection ) {
            case 'users':
                model = await User.findById(id);
                if ( !model ) {
                    return res.status(400).json({
                        msg: `No Existe un Usuario con el id ${id}`
                    }) 
                }



                break;
            case 'products':

                model = await Product.findById(id);
                if ( !model ) {
                    return res.status(400).json({
                        msg: `No Existe un Producto con el id ${id}`
                    }) 
                }
                
                break;
        
            default:
                return res.status(500).json({
                    msg: `se me olvido validar esto`
                })
        }

        if ( model.img ) {
            // hay que Borrar las imagenes del servidor
            const pathImage = path.join( __dirname, '../uploads', colection, model.img );

            if ( fs.existsSync( pathImage ) ) {
                fs.unlinkSync( pathImage );
            }

        }

        const name = await uploads( req.files, undefined, colection );

        model.img = name;

        await model.save();

        return res.json( model );
        
    } catch (err) {
        console.log('uploadUpdate err ', err);
        return res.status(500).json({
            msg: `Ocurrio un Error Hable con el Admin`
        });
    }


}

const uploadUpdateCloudinary = async (req = request, res = response) => { 

    try {

        const { id, colection } = req.params;

        let model;

        switch ( colection ) {
            case 'users':
                model = await User.findById(id);
                if ( !model ) {
                    return res.status(400).json({
                        msg: `No Existe un Usuario con el id ${id}`
                    }) 
                }



                break;
            case 'products':

                model = await Product.findById(id);
                if ( !model ) {
                    return res.status(400).json({
                        msg: `No Existe un Producto con el id ${id}`
                    }) 
                }
                
                break;
        
            default:
                return res.status(500).json({
                    msg: `se me olvido validar esto`
                })
        }

        if ( model.img ) {
            // hay que Borrar las imagenes del servidor

            const nameCut = model.img.split('/');
            const name = nameCut[ nameCut.length - 1];
            const [ public_id ] = name.split('.');
            await cloudinary.uploader.destroy( public_id );
            

        }

        const { tempFilePath } = req.files.archive;

        const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

        model.img = secure_url;

        await model.save();

        return res.json( model );
        
    } catch (err) {
        console.log('uploadUpdate err ', err);
        return res.status(500).json({
            msg: `Ocurrio un Error Hable con el Admin`
        });
    }


}

const showImg = async(req = request, res = response) => {

    try {

        const { id, colection } = req.params;

        let model;

        switch ( colection ) {
            case 'users':
                model = await User.findById(id);
                if ( !model ) {
                    return res.status(400).json({
                        msg: `No Existe un Usuario con el id ${id}`
                    }) 
                }

                break;
            case 'products':

                model = await Product.findById(id);
                if ( !model ) {
                    return res.status(400).json({
                        msg: `No Existe un Producto con el id ${id}`
                    }) 
                }
                
                break;
        
            default:
                return res.status(500).json({
                    msg: `se me olvido validar esto`
                })
        }

        if ( model.img ) {
            // hay que Borrar las imagenes del servidor
            const pathImage = path.join( __dirname, '../uploads', colection, model.img );

            if ( fs.existsSync( pathImage ) ) {
               return res.sendFile(pathImage);
            }

        }

        const pathImage = path.join( __dirname, '../assets', 'img', 'no-image.jpeg' );

        return res.sendFile(pathImage);

        
    } catch (err) {
        console.log('showImg err ', err);
        return res.status(500).json({
            msg: `Ocurrio un Error Hable con el Admin`
        });
    }

}

module.exports = {
    upload,
    uploadUpdate,
    showImg,
    uploadUpdateCloudinary,
}