var connection = require('./conexiondb');
var serviciosmodel = {}; 
 
//====================================================================================================================
//===========================================Get Servicios activos====================================================
//====================================================================================================================
serviciosmodel.getServicios = function (callback) {
    if (connection) {
        connection.query('SELECT * FROM t_servicios WHERE IdEstadoServicio = 1', function (error, rows) {
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
//============================================Agregar nuevo servicio==================================================
//====================================================================================================================
serviciosmodel.insertServicios = function (TipDocData, callback) {
    if (connection) {
        connection.query('INSERT INTO t_servicios SET ?', TipDocData, function (error, result) {
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
//=============================================Actualizar SERVICIOS===================================================
//====================================================================================================================
serviciosmodel.updateServicio = function (TipDocData, callback) {
    if (connection) {       
        var sql = 'UPDATE t_servicios SET NombreServicio = ' + connection.escape(TipDocData.NombreServicio) + ', ' +
        'DescripcionServicio = ' + connection.escape(TipDocData.DescripcionServicio) + ', ' +
        'IdEstadoServicio = ' + connection.escape(TipDocData.IdEstadoServicio) + ', ' +    
        'WHERE IdServicio = ' + TipDocData.IdServicio;    
        
        connection.query(sql, function (error, result) {        
            if (error) {
                throw error;
            }
            else {
                callback(null, { "msg": "Servicio actualizado" });
            }
        });
    }
}
//====================================================================================================================
//====================================================================================================================
//====================================================================================================================

module.exports = serviciosmodel;
