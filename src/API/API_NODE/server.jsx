const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./router.jsx'); 
const conn = require('./connection.jsx');
const authenticate = require('./authenticate.jsx');
const passport = require('passport');
const app = express();
const PORT = process.env.PORT || 3006;

app.use(cors());

app.use(bodyParser.json());
app.use(cookieParser());
conn();
app.use(passport.initialize());

app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
