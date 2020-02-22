var estadosserviciosMod = require('../models/estadosserviciosmodel');
var express = require('express');
var router = express.Router();

module.exports = function () {
    
    router.get("/estadoserviciosmodel", function (req, res) 
    {
        estadosserviciosMod.getEstadosservicios(function (error, data) 
      {
         res.status(200).json(data);
       });
    });
    return router;
} 