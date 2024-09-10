const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDB = require('./connection.jsx'); // Importando a função de conexão
const router = require('./router.jsx'); // Importando o roteador (ajustar o caminho conforme necessário)
const authenticate = require('./authenticate.jsx');
const passport = require('passport');
const { corsWithOptions } = require('./cors.jsx');
const app = express();
const PORT = process.env.PORT || 3006;

connectDB(); 

app.use(cors(corsWithOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use('/api', router); 

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
