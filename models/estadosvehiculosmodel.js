var connection = require('./conexiondb');
var estadosvehiculosMod = {};


estadosvehiculosMod.getEstadosvehiculos = function (callback) {
    if (connection) {
        connection.query('SELECT * FROM ct_estados_vehiculos', function (error, rows) {
            if (error) {
                throw error;
            }
            else {
                callback(null, rows);
            }
        });
    }
}
module.exports = estadosvehiculosMod;