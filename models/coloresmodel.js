var connection = require('./conexiondb');
var coloresMod = {};


coloresMod.getColores = function (callback) {
    if (connection) {
        connection.query('SELECT * FROM ct_colores', function (error, rows) {
            if (error) {
                throw error;
            }
            else {
                callback(null, rows);
            }
        });
    }
}
module.exports = coloresMod;