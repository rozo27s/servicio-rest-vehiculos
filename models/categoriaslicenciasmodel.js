var connection = require('./conexiondb');
var categoriasMod = {};


categoriasMod.getCategorias = function (callback) {
    if (connection) {
        connection.query('SELECT * FROM ct_categorias_licencias', function (error, rows) {
            if (error) {
                throw error;
            }
            else {
                callback(null, rows);
            }
        });
    }
}

categoriasMod.insertCategoria = function (nuevaCategoria, callback) {
    if (connection) {
        connection.query('INSERT INTO ct_categorias_licencias SET ?', nuevaCategoria, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                callback(null, { "insertId": result.insertId });
            }
        });
    }
}
  
categoriasMod.updateCategoria = function (categoria, callback) {
    if (connection) {

        var sql = 'UPDATE ct_categorias_licencias SET NombreCategoria = ' + connection.escape(categoria.NombreCategoria) + ' ' +
        'WHERE IdCategoriaLicencia = ' + categoria.IdCategoriaLicencia;
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
module.exports = categoriasMod;