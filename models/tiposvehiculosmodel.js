var connection = require('./conexiondb');
var tiposvehiculosMod = {};


tiposvehiculosMod.getTipovehiculos = function (callback) {
    if (connection) {
        connection.query('SELECT * FROM ct_tpos_de_vehiculos', function (error, rows) {
            if (error) {
                throw error;
            }
            else {
                callback(null, rows);
            }
        });
    }
}
module.exports = tiposvehiculosMod;