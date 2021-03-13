const mongoose = require('mongoose');
// const MongoError = require('mongoose').MongoError;

const dbConnection = async() => {

    try {

      await mongoose.connect( process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });

      console.log(`Base de Datos Online`);
        
    } catch (err) {
        console.log(err);
        throw new Error('Error a la hora de inicia la base de datos');
    }

}



module.exports = {
    dbConnection
}