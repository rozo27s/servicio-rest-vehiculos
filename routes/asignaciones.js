var asignacionesmod = require('../models/asignacionesmodel');
var express = require('express');
var router = express.Router();


module.exports = function () {
//====================================================================================================================
//====================================================================================================================
//====================================================================================================================

  router.get("/asignacionesmodel", function (req, res) {
    asignacionesmod.getAsignaciones(function (error, data) {
      res.status(200).json(data);
    });
  });

//====================================================================================================================
//==============================================GET POR FECHA=========================================================
//====================================================================================================================
  router.get("/asignacionesmodel/:Fecha1/:Fecha2", function (req, res) {
    
    var Fecha1 = req.params.Fecha1+' 00:00:00';
    var Fecha2 = req.params.Fecha2+' 23:00:00';
    
    if (Fecha1!=null) {      
      asignacionesmod.getAsignacionesPorfecha(Fecha1,Fecha2, function (error, data) {
        if (typeof data !== 'undefined') {
          res.json(200, data);
        }
        else {
          res.json(404, { "msg": "notExist" });
        }
      });
    }else {
      res.json(500, { "msg": "Error" });
    }
  });
  
//====================================================================================================================
//==============================================GET POR ID=========================================================
//====================================================================================================================
router.get("/asignacionesmodel/:id", function (req, res) {
  var id = req.params.id;
  
  if (!isNaN(id)) {      
    asignacionesmod.getAsignacionesPorId(id, function (error, data) {
      if (typeof data !== 'undefined') {
        res.json(200, data);
      }
      else {
        res.json(404, { "msg": "notExist" });
      }
    });
  } 
  else {
    res.json(500, { "msg": "Error" });
  }
});
//====================================================================================================================
//====================================================================================================================
//====================================================================================================================

  router.post("/asignacionesmodel", function (req, res) {
    var TipDocData =
      {
        IdAsignacion: null,
        fechaAsignacion: null,
        IdVehiculo: req.body.IdVehiculo,
        Idconductor:req.body.Idconductor,
        IdServicio:req.body.IdServicio
      };

      asignacionesmod.insertAsignaciones(TipDocData, function (error, data) {
      if (data && data.insertId) {
      res.json({ "msg": "Servicio asignado exitosamente" }); // res.redirect("/asignacionesmodel/" + data.insertId);
      }
      else {
        res.json({ "msg": "Error" });
      }
    });
  });

//====================================================================================================================
//====================================================================================================================
//====================================================================================================================

  router.put("/asignacionesmodel", function (req, res) {//ojo no se necesita farta configurar
    var TipDocData = {
        Idconductor: req.param('Idconductor'),
        Nombre1: req.param('Nombre1'),
        Nombre2: req.param('Nombre2'),
        Apellido1: req.param('Apellido1'),
        Apellido2: req.param('Apellido2'),
        IdSexo: req.param('IdSexo'),
        Documento: req.param('Documento'),
        IdTipoDeDocumento: req.param('IdTipoDeDocumento'),
        NumeroLic: req.param('NumeroLic'),
        IdCategoriaLicencia: req.param('IdCategoriaLicencia'),
        IdEstadoConductor: req.param('IdEstadoConductor')
      };

    conductoresModel.updateConductores(TipDocData, function (error, data) {
      if (data && data.msg) {
        res.json(200, data);
      }
      else {
        res.json(500, { "msg": "Error" });
      }
    });
  });
//====================================================================================================================
//====================================================================================================================
//====================================================================================================================

  return router;
}