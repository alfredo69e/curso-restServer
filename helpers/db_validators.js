const { Categorie, Role, User, Product } = require('../models');


const isRoleValide = async ( role = '') => {
    const existRole = await Role.findOne({ role });
    if( !existRole ) {
      throw new Error('El Role no Existe registrado');
    }
  };

const isEmailExist = async ( email = '') => {
  const existRole = await User.findOne({ email });
  if( existRole ) {
    throw new Error('El correo esta registrado');
  }
};

const isExisteUserId = async ( id = '') => {
  const existId = await User.findById(id);
  if( !existId ) {
    throw new Error('El Usuario no Existe');
  }
};

const isExisteCategorieId = async ( id = '') => {
  const existId = await Categorie.findById(id);
  if( !existId ) {
    throw new Error('La Categoria no Existe');
  }
};

const isExistProductId = async ( id = '') => {
  const existId = await Product.findById(id);
  if( !existId ) {
    throw new Error('El Producto no Existe');
  }
};

// Validar Colecciones
const colectionPermitidas = async ( colection = '',  colections = [] ) => {

  if( !colections.includes( colection ) ) {
    throw new Error('la Coleccion no es Permitida');
  }

};




module.exports = {
    isRoleValide,
    isEmailExist,
    isExisteUserId,
    isExisteCategorieId,
    isExistProductId,
    colectionPermitidas
};