var connection = require('./conexiondb');
var sexoMod = {};


sexoMod.getSexo = function (callback) {
    if (connection) {
        connection.query('SELECT * FROM ct_sexo', function (error, rows) {
            if (error) {
                throw error;
            }
            else {
                callback(null, rows); 
            }
        });
    }
}

sexoMod.insertSexo = function (TipDocData, callback) {
    if (connection) {
        connection.query('INSERT INTO ct_sexo SET ?', TipDocData, function (error, result) {
            if (error) {
                throw error;
            }
            else {
                callback(null, { "insertId": result.insertId });
            }
        });
    }
}




module.exports = sexoMod;