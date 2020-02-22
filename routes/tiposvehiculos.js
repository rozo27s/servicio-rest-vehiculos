var tiposvehiculosMod = require('../models/tiposvehiculosmodel');
var express = require('express');
var router = express.Router();

module.exports = function () {
    
    router.get("/tiposvehiculosmodel", function (req, res) 
    {
        tiposvehiculosMod.getTipovehiculos(function (error, data) 
      {
         res.status(200).json(data);
       });
    });
    return router;
} 