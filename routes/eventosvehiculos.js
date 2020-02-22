var eventosvehiculosmod = require('../models/eventosvehiculosmodel');
var express = require('express');
var router = express.Router();

 
module.exports = function () {

    
//====================================================================================================================
//====================================================================================================================
//====================================================================================================================

router.get("/eventosvehiculosmodel/:Fecha1/:Fecha2", function (req, res) {

    var Fecha1 = req.params.Fecha1+' 00:00:00';
    var Fecha2 = req.params.Fecha2+' 23:00:00';
     
    if (Fecha1!=null) {
       
       eventosvehiculosmod.getEventosvehiculosFecha(Fecha1,Fecha2, function (error, data) {//Informe de historia por periodo de tiempo 
        if (typeof data !== 'undefined') {
         res.json(200, data);
        }
        else {
          res.json(404, { "msg": "notExist" });
        }
      });
    }else {
      res.json({ "msg": "Error" });
    }
  });

//====================================================================================================================
//====================================================================================================================
//====================================================================================================================

  router.post("/eventosvehiculosmodel", function (req, res) {
    var TipDocData =
      { 
        IdEventoVeh: null,
        NombreEvento: req.body.NombreEvento,
        DescripcionEvento: req.body.DescripcionEvento,
        FechaEvento: null,
        IdVehiculo: req.body.IdVehiculo,
      };
      eventosvehiculosmod.insertEventosvehiculos(TipDocData, function (error, data) {////////////////insertar
        if (data && data.insertId) {
         res.json({ "msg": "Evento guardado" }); //res.redirect("/eventosvehiculosmodel/" + data.insertId);
        }
        else {
          res.json({ "msg": "Error" });
        }
      });
  });

//====================================================================================================================
//====================================================================================================================
//====================================================================================================================

  return router;
}