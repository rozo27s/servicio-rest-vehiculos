var estadoConMod = require('../models/estadoconductormodel');
var express = require('express');
var router = express.Router();

module.exports = function () {
     
    router.get("/estadoconmodel", function (req, res) 
    {
        estadoConMod.getEstadoconductor(function (error, data) 
      {
         res.status(200).json(data);
       });
    });
   
    router.post("/estadoconmodel", function (req, res) {
        var TipDocData =
          { 
            IdEstadoConductor: null, 
            EstadoConductor: req.body.EstadoConductor
          };
          estadoConMod.insertEstado(TipDocData, function (error, data) {
          if (data) {
            res.json(200, data);
          }
          else {
            res.json({ "msg": "Error" });
          }
        });
      });


    return router;
} 