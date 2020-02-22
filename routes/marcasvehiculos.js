var marcasvehiculosMod = require('../models/marcasvehiculosmodel');
var express = require('express');
var router = express.Router();

module.exports = function () {
    
    router.get("/marcasvehiculosmodel", function (req, res) 
    {
        marcasvehiculosMod.getMarcasvehiculos(function (error, data) 
      {
         res.status(200).json(data);
       });
    });
    return router;
} 