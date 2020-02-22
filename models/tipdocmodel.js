//=======================================Obtenemos la conexion a la base de
var connection = require('./conexiondb');
//creamos un objeto para ir almacenando todo lo que necesitemos
var TipDocModel = {};

//obtenemos todos los tipos de documento
TipDocModel.getTipDocs = function (callback) 
{
    if (connection) 
    {
        connection.query('SELECT * FROM ct_tipos_documentos', function (error, rows) 
        {
            if (error) 
            {
                throw error;
            }
            else 
            {
                callback(null, rows);
            }
        });
    }
}

//obtenemos un tipo doc por su id
TipDocModel.getTipDoc = function (id, callback) 
{
    if (connection) 
    {
        var sql = 'SELECT * FROM ct_tipos_documentos WHERE id_tipodocumento = ' + connection.escape(id);

        connection.query(sql, function (error, row) 
        {
            if (error) 
            {
                throw error;
            }
            else 
            {
                callback(null, row);
            }
        });
    }
}

//añadir un nuevo tipo de documento
TipDocModel.insertTipDoc = function (TipDocData, callback) 
{
    if (connection) 
    {
        connection.query('INSERT INTO ct_tipos_documentos SET ?', TipDocData, function (error, result) 
        {
            if (error) 
            {
                throw error;
            }
            else 
            {
                //devolvemos la última id insertada
                callback(null, { "insertId": result.insertId });
            }
        });
    }
}

//actualizar un tipo de documento
TipDocModel.updateTipDoc = function (TipDocData, callback){   
    if (connection) 
    {
        var sql = 'UPDATE ct_tipos_documentos SET tipo_documento = ' + connection.escape(TipDocData.tipo_documento) + ',' +
            'iniciales_tipo_documento = ' + connection.escape(TipDocData.iniciales_tipo_documento) +
            'WHERE id_tipodocumento = ' + TipDocData.id_tipodocumento;

        connection.query(sql, function (error, result) 
        {
            if (error) 
            {
                throw error;
            }
            else 
            {
                callback(null, { "msg": "Dato actualizado" });
            }
        });
    }
}

//eliminar un tipo de documento pasando la id a eliminar
TipDocModel.deleteTipDoc = function (id, callback) 
{
    if (connection) 
    {
        var sqlExists = 'SELECT * FROM ct_tipos_documentos WHERE id_tipodocumento = ' + connection.escape(id);
        
        connection.query(sqlExists, function (err, row) 
        {
            //si existe la id del usuario a eliminar
            if (row) 
            {
                var sql = 'DELETE FROM ct_tipos_documentos WHERE id_tipodocumento = ' + connection.escape(id);
                
                connection.query(sql, function (error, result) 
                {
                    if (error) 
                    {
                        throw error;
                    }
                    else 
                    {
                        callback(null, { "msg": "deleted" });
                    }
                });
            }
            else 
            {
                callback(null, { "msg": "notExist" });
            }
        });
    }
}
 
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = TipDocModel;
