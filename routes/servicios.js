var serviciosmodel = require('../models/serviciosmodel');
var express = require('express'); 
var router = express.Router();

 
module.exports = function () {
//====================================================================================================================
//===========================================Get servicios activos====================================================
//====================================================================================================================

  router.get("/serviciosmodel", function (req, res) {
    serviciosmodel.getServicios(function (error, data) {
      res.status(200).json(data);
    });
  });
 
//====================================================================================================================
//=============================================Agregar nuevo servicio=================================================
//====================================================================================================================

  router.post("/serviciosmodel", function (req, res) {
    var TipDocData =
      { 
        IdServicio: null, 
        NombreServicio: req.body.NombreServicio,
        DescripcionServicio: req.body.DescripcionServicio,
        FechaServicio: null,
        IdEstadoServicio: req.body.IdEstadoServicio        
      };
      serviciosmodel.insertServicios(TipDocData, function (error, data) {
      if (data && data.insertId) {
      res.json({ "msg": "Servicio guardado" });  //res.redirect("/serviciosmodel/" + data.insertId);
      }
      else {
        res.json(500, { "msg": "Error" });
      }
    });
  });
//====================================================================================================================
//========================================actualizar conductores======================================================
//====================================================================================================================
router.put("/serviciosmodel", function (req, res) {
  var TipDocData = {
      IdServicio: req.param('IdServicio'),
      NombreServicio: req.param('NombreServicio'),
      DescripcionServicio: req.param('DescripcionServicio'),
      IdEstadoServicio: req.param('IdEstadoServicio'),
    };

    serviciosmodel.updateServicio(TipDocData, function (error, data) {
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