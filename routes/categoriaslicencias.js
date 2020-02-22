var categoriasMod = require('../models/categoriaslicenciasmodel');
var express = require('express');
var router = express.Router();

module.exports = function () {
    
    router.get("/categoriasmodel", function (req, res) 
    {
        categoriasMod.getCategorias(function (error, data) 
      {
         res.status(200).json(data);
       });
    });
   
    return router;
} 

router.post("/categoriasmodel", function (req, res) {
    var nuevaCategoria =
      {
        IdCategoriaLicencia: null,
        NombreCategoria: req.body.NombreCategoria
      };

      categoriasMod.insertCategoria(nuevaCategoria, function (error, data) {
      if (data && data.insertId) {
      res.json({ "msg": "Nueva categoria guardada" }); // res.redirect("/asignacionesmodel/" + data.insertId);
      }
      else {
        res.json({ "msg": "Error" });
      }
    });
  });

  router.put("/categoriasmodel", function (req, res) {
    var TipDocData = {
        IdCategoriaLicencia: req.param('IdCategoriaLicencia'),
        NombreCategoria: req.param('NombreCategoria')
      };

      categoriasMod.updateCategoria(TipDocData, function (error, data) {
      if (data && data.msg) {
        res.json(200, data);
      }
      else {
        res.json(500, { "msg": "Error" });
      }
    });
  });