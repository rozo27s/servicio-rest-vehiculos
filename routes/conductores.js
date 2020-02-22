var conductoresModel = require('../models/conductoresmodel');
var express = require('express');
var router = express.Router();

  
module.exports = function () {
//====================================================================================================================
//=============================================get todos los conductores==============================================
//====================================================================================================================
  router.get("/condmodel", function (req, res) {
    conductoresModel.getConductores(function (error, data) {
      res.status(200).json(data);
    });
  });

//====================================================================================================================
//=============================================get conductores activos================================================
//====================================================================================================================
router.get("/condActivosmodel", function (req, res) {
  conductoresModel.getConductoresAct(function (error, data) {
    res.status(200).json(data);
  });
});

//====================================================================================================================
//===========================================get conductores por id===================================================
//====================================================================================================================
  router.get("/condmodel/:id", function (req, res) {
    var id = req.params.id;
    if (!isNaN(id)) {
      
      conductoresModel.getConductorid(id, function (error, data) {
        if (typeof data !== 'undefined' && data.length > 0) {
          res.status(200).json(data)         
        }
        else {
          res.status(404).json({ "msg": "notExist" })
          //res.json(404, { "msg": "notExist" });
        }
      });
    } 
    else {
      //res.json(500, { "msg": "Error" });
      res.status(500).json({ "msg": "Error" })
    }
  });

//====================================================================================================================
//==========================================Agregar nuevo conductor===================================================
//====================================================================================================================
  router.post("/condmodel", function (req, res) {
    var TipDocData =
      { 
        Idconductor: null, 
        Nombre1: req.body.Nombre1,
        Nombre2: req.body.Nombre2,
        Apellido1: req.body.Apellido1,
        Apellido2: req.body.Apellido2,
        IdSexo: req.body.IdSexo,
        Documento: req.body.Documento,
        IdTipoDeDocumento: req.body.IdTipoDeDocumento,
        NumeroLic: req.body.NumeroLic,
        IdCategoriaLicencia: req.body.IdCategoriaLicencia,
        IdEstadoConductor: req.body.IdEstadoConductor
      };
    conductoresModel.insertConductor(TipDocData, function (error, data) {
      if (data) {
        res.status(200).json(data)
      }
      else {
        res.json({ "msg": "Error" });
      }
    });
  });

//====================================================================================================================
//========================================actualizar conductores======================================================
//====================================================================================================================
  router.put("/condmodel", function (req, res) {
    var TipDocData = {
        Idconductor: req.body.Idconductor,
        Nombre1: req.body.Nombre1,
        Nombre2: req.body.Nombre2,
        Apellido1: req.body.Apellido1,
        Apellido2: req.body.Apellido2,
        IdSexo: req.body.IdSexo,
        Documento: req.body.Documento,
        IdTipoDeDocumento: req.body.IdTipoDeDocumento,
        NumeroLic: req.body.NumeroLic,
        IdCategoriaLicencia: req.body.IdCategoriaLicencia,
        IdEstadoConductor: req.body.IdEstadoConductor
      };

    conductoresModel.updateConductores(TipDocData, function (error, data) {
      if (data && data.msg) {
        res.status(200).json(data)
      }
      else {
        res.status(500).json({ "msg": "Error" })
      }
    });
  });
//====================================================================================================================
//====================================================================================================================
//====================================================================================================================

  return router;
}