const { v4: uuidv4 } = require('uuid');
const path = require('path');


const uploads = ( files, extencionsValidas = [ 'png', 'jpg', 'jpeg', 'gif' ], folder = '' ) => {

    return new Promise(( resolve, reject ) => {

        try {
           
            const { archive } = files;
            const nameCut = archive.name.split('.');
            const extencion = nameCut[nameCut.length - 1];
    
            // Validar Extenciones
            if ( !extencionsValidas.includes( extencion ) ) {
               return reject({msg: `La Extencion ${ extencion } no en Permitida`}) 
            }
    
            const nameTemp = `${uuidv4()}.${extencion}`;
            const uploadPath = path.join( __dirname, '../uploads/', folder, nameTemp );
          
            archive.mv(uploadPath, ( err ) => {
              if (err) {
                  console.log('upload ', err);
                return reject(err);
              }
          
              return resolve( nameTemp );
            });
    
        } catch (err) {
            console.log('categoriesDetele err ', err);
            return reject({
                msg: `Ocurrio un Error Hable con el Admin`
            });
        }

    });
  
  
}

module.exports = {
    uploads
}