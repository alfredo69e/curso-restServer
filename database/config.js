const mongoose = require('mongoose');
// const MongoError = require('mongoose').MongoError;

const dbConnection = async() => {

    try {

      await mongoose.connect( process.env.MONGODB_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: false,
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 20000 // Close sockets after 20 seconds of inactivity
      });

      console.log(`Base de Datos Online`);
        
    } catch (err) {
        console.log(`dbConnection err ${err}`);
        throw new Error('Error a la hora de inicia la base de datos');
    }

}



module.exports = {
    dbConnection
}