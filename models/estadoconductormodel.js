var connection = require('./conexiondb');
var estadoConMod = {};

 
estadoConMod.getEstadoconductor = function (callback) {
    if (connection) {
        connection.query('SELECT * FROM ct_estadoconductor', function (error, rows) {
            if (error) {
                throw error;
            }
            else {
                callback(null, rows);
            }
        });
    }
} 

estadoConMod.insertEstado = function (TipDocData, callback) {
    if (connection) {
        connection.query('INSERT INTO ct_estadoconductor SET ?', TipDocData, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                callback(null, { "insertId": result.insertId });
            }
        });
    }
}


module.exports = estadoConMod;