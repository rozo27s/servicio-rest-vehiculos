var connection = require('./conexiondb');
var eventosvehiculosmod = {}; 

//====================================================================================================================
//====================================================================================================================
//====================================================================================================================
eventosvehiculosmod.getEventosvehiculosFecha = function (Fecha1,Fecha2, callback) {
    if (connection) {
        var sql = 'SELECT NombreEvento,DescripcionEvento, DATE_FORMAT(DATE_FORMAT( FechaEvento , GET_FORMAT( DATETIME, "USA" ) ),"%d-%m-%Y")as FechaEvento,Placa FROM dbvehiculos.t_eventos_vehiculos INNER JOIN t_vehiculos ON t_eventos_vehiculos.IdVehiculo= t_vehiculos.IdVehiculo WHERE t_eventos_vehiculos.FechaEvento >= '+connection.escape(Fecha1)+' AND t_eventos_vehiculos.FechaEvento <= '+connection.escape(Fecha2)+' order by  FechaEvento asc';
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
eventosvehiculosmod.insertEventosvehiculos = function (TipDocData, callback) {
    if (connection) {
        connection.query('INSERT INTO t_eventos_vehiculos SET ?', TipDocData, function (error, result) {
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

module.exports = eventosvehiculosmod;
