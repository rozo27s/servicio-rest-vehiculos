//llamamos al paquete mysql que hemos instalado
var mysql = require('mysql'),

    //creamos la conexion a nuestra base de datos con los datos de acceso de cada uno
    connection = mysql.createConnection({
            host: '64.225.21.215',
            user: 'Javier',
            password: 'Rozo2788.',
            database: 'dbvehiculos'
        });
        
        connection.connect(function(error){
            if(error){
               throw error;
            }else{
               console.log('¡¡¡Conexión establecida con la base de datos!!!');
            }
         });
         
module.exports = connection;