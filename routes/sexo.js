var SexoMod = require('../models/sexomodel');
var express = require('express');
var router = express.Router();

module.exports = function () {
    
    router.get("/sexomodel", function (req, res) 
    {
        SexoMod.getSexo(function (error, data) 
      {
         res.status(200).json(data);
       });
    });


    router.post("/sexomodel", function (req, res) {
        var TipDocData =
          { 
            IdSexo: null, 
            sexo: req.body.sexo
          };
          SexoMod.insertSexo(TipDocData, function (error, data) {
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