var connection = require('./conexiondb');
var marcasvehiculosMod = {};


marcasvehiculosMod.getMarcasvehiculos = function (callback) {
    if (connection) {
        connection.query('SELECT * FROM ct_marcas_vehiculos', function (error, rows) {
            if (error) {
                throw error;
            }
            else {
                callback(null, rows);
            }
        });
    }
}
module.exports = marcasvehiculosMod;