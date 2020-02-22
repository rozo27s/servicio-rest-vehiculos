var connection = require('./conexiondb');
var vehiculosmodel = {}; 
 
//====================================================================================================================
//==========================================get todos los vehiculos===================================================
//====================================================================================================================
vehiculosmodel.getVehiculos = function (callback) {
    if (connection) {
        connection.query('SELECT IdVehiculo,Placa,Modelo,NombreColor,EstadoVehiculo,NombreMarca,NombreCategoria,NombreTipoVehiculo FROM dbvehiculos.t_vehiculos INNER JOIN ct_colores ON ct_colores.IdColor= t_vehiculos.IdColor INNER JOIN ct_estados_vehiculos ON t_vehiculos.IdEstadoVehiculo=ct_estados_vehiculos.IdEstadoVehiculo INNER JOIN ct_marcas_vehiculos ON t_vehiculos.IdMarca=ct_marcas_vehiculos.IdMarca INNER JOIN ct_categorias_licencias ON t_vehiculos.IdCategoriaLicencia=ct_categorias_licencias.IdCategoriaLicencia INNER JOIN ct_tpos_de_vehiculos ON t_vehiculos.IdTipoDeVehiculo=ct_tpos_de_vehiculos.IdTipoDeVehiculo ORDER BY Placa ASC', function (error, rows) {
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
//============================================get vehiculos activos===================================================
//====================================================================================================================
vehiculosmodel.getVehiculosAct = function (callback) {
    if (connection) {
        connection.query('SELECT IdVehiculo,Placa,Modelo,NombreColor,EstadoVehiculo,NombreMarca,NombreCategoria,NombreTipoVehiculo FROM dbvehiculos.t_vehiculos INNER JOIN ct_colores ON ct_colores.IdColor= t_vehiculos.IdColor INNER JOIN ct_estados_vehiculos ON t_vehiculos.IdEstadoVehiculo=ct_estados_vehiculos.IdEstadoVehiculo INNER JOIN ct_marcas_vehiculos ON t_vehiculos.IdMarca=ct_marcas_vehiculos.IdMarca INNER JOIN ct_categorias_licencias ON t_vehiculos.IdCategoriaLicencia=ct_categorias_licencias.IdCategoriaLicencia INNER JOIN ct_tpos_de_vehiculos ON t_vehiculos.IdTipoDeVehiculo=ct_tpos_de_vehiculos.IdTipoDeVehiculo WHERE t_vehiculos.IdEstadoVehiculo = 1 ORDER BY Placa ASC', function (error, rows) {
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
//===========================================get conductores por id===================================================
//====================================================================================================================
vehiculosmodel.getVehiculosid = function (id, callback) {
    if (connection) {
        var sql = 'SELECT * FROM t_vehiculos WHERE IdVehiculo = ' + connection.escape(id);
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
//=======================================insertar nuevo cunductor=====================================================
//====================================================================================================================
vehiculosmodel.insertVehiculos = function (TipDocData, callback) {
    if (connection) {
        connection.query('INSERT INTO t_vehiculos SET ?', TipDocData, function (error, result) {
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
//=============================================Actualizar vehiculos===================================================
//====================================================================================================================
vehiculosmodel.updateVehiculos = function (TipDocData, callback) {
    
    if (connection) {
        
        
        var sql = 'UPDATE t_vehiculos SET Placa = ' + connection.escape(TipDocData.Placa) + ', ' +
        'Modelo = ' + connection.escape(TipDocData.Modelo) + ', ' +
        'IdColor = ' + connection.escape(TipDocData.IdColor) + ', ' +
        'IdEstadoVehiculo = ' + connection.escape(TipDocData.IdEstadoVehiculo) + ', ' +
        'IdMarca = ' + connection.escape(TipDocData.IdMarca) + ', ' +
        'IdCategoriaLicencia = ' + connection.escape(TipDocData.IdCategoriaLicencia) + ', ' + 
        'IdTipoDeVehiculo = ' +connection.escape(TipDocData.IdTipoDeVehiculo)+' '+               
        'WHERE IdVehiculo = ' + TipDocData.IdVehiculo;
    
        
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

module.exports = vehiculosmodel;
