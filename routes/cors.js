const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://dontallow.com'];

var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    console.log(req.header('Origin'));
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: false };
    }
    else {
        corsOptions = { origin: true };
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate); //checks for origin