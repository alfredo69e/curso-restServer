const Role = require('../models/user/role');
const User = require('../models/user/user');




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


module.exports = {
    isRoleValide,
    isEmailExist,
    isExisteUserId,
};