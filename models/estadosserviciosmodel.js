var connection = require('./conexiondb');
var estadosserviciosMod = {};


estadosserviciosMod.getEstadosservicios = function (callback) {
    if (connection) {
        connection.query('SELECT * FROM ct_estados_servicios', function (error, rows) {
            if (error) {
                throw error;
            }
            else {
                callback(null, rows);
            }
        });
    }
}
module.exports = estadosserviciosMod;