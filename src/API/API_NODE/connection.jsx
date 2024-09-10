const mongoose = require('mongoose');
const config = require('./config.jsx');

const mongoURI = config.mongoUrl;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1); 
  }
};

module.exports = connectDB;
