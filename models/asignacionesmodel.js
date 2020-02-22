var connection = require('./conexiondb');
var asignacionesmod = {}; 
 
//====================================================================================================================
//========================================TODOSLOS SERVICIOS ORDENADOS================================================
//====================================================================================================================
asignacionesmod.getAsignaciones = function (callback) {
    if (connection) {
        connection.query('SELECT * FROM t_asignaciones_conductores_a_vehiculos ORDER BY fechaAsignacion desc', function (error, rows) {
            if (error) {
                throw error;
            }
            else {
                callback(null, rows);
            }
        });
    } 
} 
//====================================================================================================================
//==============================SERVICIOS POR RANGO DE FECHA==========================================================
//====================================================================================================================
asignacionesmod.getAsignacionesPorfecha = function (Fecha1,Fecha2, callback) {
    if (connection) {
        var sql = 'SELECT IdAsignacion,DATE_FORMAT(DATE_FORMAT( fechaAsignacion , GET_FORMAT( DATETIME, "USA" ) ),"%d-%m-%Y")as fechaAsignacion,Placa,Documento,DescripcionServicio FROM dbvehiculos.t_asignaciones_conductores_a_vehiculos INNER JOIN t_vehiculos ON t_asignaciones_conductores_a_vehiculos.IdVehiculo=t_vehiculos.IdVehiculo INNER JOIN t_conductores ON t_asignaciones_conductores_a_vehiculos.Idconductor=t_conductores.Idconductor INNER JOIN t_servicios ON t_asignaciones_conductores_a_vehiculos.IdServicio=t_servicios.IdServicio WHERE  fechaAsignacion >= '+connection.escape(Fecha1)+' AND fechaAsignacion <='+connection.escape(Fecha2)+' order by  fechaAsignacion asc';
        connection.query(sql, function (error, row) {
            
            if (error) {
                throw error;
            }
            else {
                callback(null, row);
            }
        });
    }
}
//====================================================================================================================
//===================================SERVICIOS  POR IDCONDUCTOR=======================================================
//====================================================================================================================
asignacionesmod.getAsignacionesPorId = function (id, callback) {
    if (connection) {
        var sql = 'SELECT IdAsignacion,DATE_FORMAT(DATE_FORMAT( fechaAsignacion , GET_FORMAT( DATETIME, "USA" ) ),"%d-%m-%Y")as fechaAsignacion,Placa,Documento,DescripcionServicio FROM dbvehiculos.t_asignaciones_conductores_a_vehiculos INNER JOIN t_vehiculos ON t_asignaciones_conductores_a_vehiculos.IdVehiculo=t_vehiculos.IdVehiculo INNER JOIN t_conductores ON t_asignaciones_conductores_a_vehiculos.Idconductor=t_conductores.Idconductor INNER JOIN t_servicios ON t_asignaciones_conductores_a_vehiculos.IdServicio=t_servicios.IdServicio WHERE  t_asignaciones_conductores_a_vehiculos.Idconductor = '+connection.escape(id)+' order by  fechaAsignacion asc';
        connection.query(sql, function (error, row) {
            
            if (error) {
                throw error;
            }
            else {
                callback(null, row);
            }
        });
    }
}
//====================================================================================================================
//====================================================================================================================
//====================================================================================================================
asignacionesmod.insertAsignaciones = function (TipDocData, callback) {
    if (connection) {
        connection.query('INSERT INTO t_asignaciones_conductores_a_vehiculos SET ?', TipDocData, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                callback(null, { "insertId": result.insertId });
            }
        });
    }
}
//====================================================================================================================
//====================================================================================================================
//====================================================================================================================
asignacionesmod.updateAsignacionesEstado = function (TipDocData, callback) {
    if (connection) {

        var sql = 'UPDATE t_conductores SET Nombre1 = ' + connection.escape(TipDocData.Nombre1) + ',' +
        'Nombre2 = ' + connection.escape(TipDocData.Nombre2) + ',' +
        'Apellido1 = ' + connection.escape(TipDocData.Apellido1) + ',' +
        'Apellido2 = ' + connection.escape(TipDocData.Apellido2) + ',' +
        'IdSexo = ' + connection.escape(TipDocData.IdSexo) + ',' +
        'Documento = ' + connection.escape(TipDocData.Documento) + ',' +
        'IdTipoDeDocumento = ' + connection.escape(TipDocData.IdTipoDeDocumento)+ ',' +
        'NumeroLic = ' + connection.escape(TipDocData.NumeroLic)+ 
        'WHERE Idconductor = ' + TipDocData.Idconductor;
        connection.query(sql, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                callback(null, { "msg": "Dato actualizado" });
            }
        });
    }
}
//====================================================================================================================
//====================================================================================================================
//====================================================================================================================

module.exports = asignacionesmod;
