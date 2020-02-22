var vehiculosmodel = require('../models/vehiculosmodel');
var express = require('express');
var router = express.Router();

vehiculosmodel.getVehiculos
module.exports = function () {
//====================================================================================================================
//=============================================get todos los vehiculos================================================
//====================================================================================================================
  router.get("/vehiculosmodel", function (req, res) {
    vehiculosmodel.getVehiculos(function (error, data) {
      res.status(200).json(data);
    });
  });

//====================================================================================================================
//===============================================get vehiculos activos================================================
//====================================================================================================================
router.get("/vehiculosActivosmodel", function (req, res) {
    vehiculosmodel.getVehiculosAct(function (error, data) {
    res.status(200).json(data);
  });
});

//====================================================================================================================
//=============================================get vehiculos por id===================================================
//====================================================================================================================
  router.get("/vehiculosmodel/:id", function (req, res) {
    var id = req.params.id;
    if (!isNaN(id)) {
      
        vehiculosmodel.getVehiculosid(id, function (error, data) {
        if (typeof data !== 'undefined' && data.length > 0) {
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
//===========================================Agregar nuevo vehiculo===================================================
//====================================================================================================================
  router.post("/vehiculosmodel", function (req, res) {
    var TipDocData =
      { 
        IdVehiculo: null, 
        Placa: req.body.Placa,
        Modelo: req.body.Modelo,
        IdColor: req.body.IdColor,
        IdEstadoVehiculo: req.body.IdEstadoVehiculo,
        IdMarca: req.body.IdMarca,
        IdCategoriaLicencia: req.body.IdCategoriaLicencia,
        IdTipoDeVehiculo: req.body.IdTipoDeVehiculo        
      };

      vehiculosmodel.insertVehiculos(TipDocData, function (error, data) {
      if (data && data.insertId) {
      res.json({ "mensaje": "Guardado" }); //res.redirect("/vehiculosmodel/" + data.insertId);
      }
      else {
        res.json(500, { "msg": "Error" });
      }
    });
  });

//====================================================================================================================
//========================================actualizar conductores======================================================
//====================================================================================================================
  router.put("/vehiculosmodel", function (req, res) {
    var TipDocData = {
        IdVehiculo: req.param('IdVehiculo'),
        Placa: req.param('Placa'),
        Modelo: req.param('Modelo'),
        IdColor: req.param('IdColor'),
        IdEstadoVehiculo: req.param('IdEstadoVehiculo'),
        IdMarca: req.param('IdMarca'),
        IdCategoriaLicencia: req.param('IdCategoriaLicencia'),
        IdTipoDeVehiculo: req.param('IdTipoDeVehiculo')
      };

    vehiculosmodel.updateVehiculos(TipDocData, function (error, data) {
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