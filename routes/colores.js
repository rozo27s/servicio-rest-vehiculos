var coloresMod = require('../models/coloresmodel');
var express = require('express');
var router = express.Router();

module.exports = function () {
    
    router.get("/coloresmodel", function (req, res) 
    {
        coloresMod.getColores(function (error, data) 
      {
         res.status(200).json(data);
       });
    });
    return router;
} 