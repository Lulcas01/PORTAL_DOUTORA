const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:3000', 'https://localhost:3006', 'mongodb://localhost:27017/portal_da_doutora', 'https://192.168.0.135:3000'];
const corsOptionsDelegate = (req, callback) =>{
    var corsOptions = { credentials: true };
    console.log(req.header('Origins'));
    if(whitelist.indexOf(req.header('Origin')) !== -1){
        corsOptions = { credentials: true, origin:true };
    }
    else{
        corsOptions = { credentials: true, origin:false };
    }
    
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);