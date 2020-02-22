var estadosvehiculosMod = require('../models/estadosvehiculosmodel');
var express = require('express');
var router = express.Router();

module.exports = function () {
    
    router.get("/estadosvehiculosmodel", function (req, res) 
    {
        estadosvehiculosMod.getEstadosvehiculos(function (error, data) 
      {
         res.status(200).json(data);
       });
    });
    return router;
} 