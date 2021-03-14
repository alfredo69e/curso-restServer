const { request, response } = require("express")


const isAdminRole = (req = request, res = response, next ) => {

    

    if ( !req.user ) {
        return res.status(500).json({
            msg: `Se Quiere Verificar el Rol sin validar el token`
        });
    }

    const { role, name } = req.user;

    // Validate el Role
    if ( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${ name } no es Adminitrador`
        });
    }


    next();

}

const tieneRole = ( ...roles ) => {

    return (req = request, res = response, next) => {

        if ( !req.user ) {
            return res.status(500).json({
                msg: `Se Quiere Verificar el Rol sin validar el token`
            });
        }

        if( !roles.includes( req.user.role ) ) {
            return res.status(401).json({
                msg: `El Servicio Requiere uno de estos roles ${roles}`
            });
        }
        
        next();
    }

}

module.exports = {
    isAdminRole,
    tieneRole
}