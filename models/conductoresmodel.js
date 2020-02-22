var connection = require('./conexiondb');
var conductoresmodel = {}; 
 
//====================================================================================================================
//==========================================get todos los conductores=================================================
//====================================================================================================================
conductoresmodel.getConductores = function (callback) {
    if (connection) {
        connection.query('SELECT Idconductor,Nombre1,Nombre2,Apellido1,Apellido2,sexo,Documento,tipo_documento,NumeroLic,NombreCategoria,EstadoConductor FROM dbvehiculos.t_conductores INNER JOIN ct_sexo ON t_conductores.IdSexo= ct_sexo.IdSexo INNER JOIN ct_tipos_documentos ON t_conductores.IdTipoDeDocumento= ct_tipos_documentos.id_tipodocumento INNER JOIN ct_categorias_licencias ON t_conductores.IdCategoriaLicencia= ct_categorias_licencias.IdCategoriaLicencia INNER JOIN ct_estadoconductor ON t_conductores.IdEstadoConductor= ct_estadoconductor.IdEstadoConductor ORDER BY Nombre1 ASC,Nombre2 ASC,Apellido1 ASC,Apellido2 ASC', function (error, rows) { 
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
//==========================================get conductores activos===================================================
//====================================================================================================================
conductoresmodel.getConductoresAct = function (callback) {
    if (connection) {
        connection.query('SELECT Idconductor,Nombre1,Nombre2,Apellido1,Apellido2,sexo,Documento,tipo_documento,NumeroLic,NombreCategoria,EstadoConductor FROM dbvehiculos.t_conductores INNER JOIN ct_sexo ON t_conductores.IdSexo= ct_sexo.IdSexo INNER JOIN ct_tipos_documentos ON t_conductores.IdTipoDeDocumento= ct_tipos_documentos.id_tipodocumento INNER JOIN ct_categorias_licencias ON t_conductores.IdCategoriaLicencia= ct_categorias_licencias.IdCategoriaLicencia INNER JOIN ct_estadoconductor ON t_conductores.IdEstadoConductor= ct_estadoconductor.IdEstadoConductor WHERE t_conductores.IdEstadoConductor = 1 ORDER BY Nombre1 ASC,Nombre2 ASC,Apellido1 ASC,Apellido2 ASC', function (error, rows) {
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
conductoresmodel.getConductorid = function (id, callback) {
    if (connection) {
        var sql = 'SELECT * FROM t_conductores WHERE Idconductor = ' + connection.escape(id);
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
conductoresmodel.insertConductor = function (TipDocData, callback) {
    if (connection) {
        connection.query('INSERT INTO t_conductores SET ?', TipDocData, function (error, result) {
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
//===========================================Actualizar conductores===================================================
//====================================================================================================================
conductoresmodel.updateConductores = function (TipDocData, callback) {
    if (connection) {
        
        
        var sql = 'UPDATE t_conductores SET Nombre1 = ' + connection.escape(TipDocData.Nombre1) + ',' +
        'Nombre2 = ' + connection.escape(TipDocData.Nombre2) + ',' +
        'Apellido1 = ' + connection.escape(TipDocData.Apellido1) + ',' +
        'Apellido2 = ' + connection.escape(TipDocData.Apellido2) + ',' +
        'IdSexo = ' + connection.escape(TipDocData.IdSexo) + ',' +
        'Documento = ' + connection.escape(TipDocData.Documento) + ',' +        
        'IdTipoDeDocumento = ' + connection.escape(TipDocData.IdTipoDeDocumento)+ ',' +
        'NumeroLic = ' + connection.escape(TipDocData.NumeroLic)+ ',' +
        'IdCategoriaLicencia = ' +connection.escape(TipDocData.IdCategoriaLicencia)+','+ 
        'IdEstadoConductor = ' +connection.escape(TipDocData.IdEstadoConductor)+' '+               
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

module.exports = conductoresmodel;
