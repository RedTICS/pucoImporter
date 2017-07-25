import * as configPrivate from './config.private';
import { servicioMssql } from './pucoImporter'
// Require
const MongoClient = require('mongodb').MongoClient;
const url = configPrivate.mongoDB.host;
const coleccion = configPrivate.mongoDB.collection;
const usuario: any = configPrivate.auth.user;
const pass: any = configPrivate.auth.password;
const server: any = configPrivate.serverSql.server;
const db: any = configPrivate.serverSql.database;
const consulta: any = 'SELECT OS.cod_os as cod_Puco, OS.nombre FROM obras_sociales as OS';
const servicio: any = new servicioMssql();
//Se importan los datos desde SQL a un archivo json,
//Luego con mongoimport se pueden insertar los datos a la bd de Mongo
servicio.getObrasSociales(usuario, pass, server, db, consulta)
    .then((resultado: any) => {
        if (resultado == null) {
            console.log('No encontrado');
        } else {
            console.log('Iniciando actualizacion...')
            updateMongo(resultado);
        }
    }).catch((err: any) => {
        console.error('Error**:' + err)
    });

function updateMongo(listadoPuco: any) {
    MongoClient.connect(url, function (err: any, dbMongo: any) {
        if (err) {
            console.log('Error conectando a mongoClient', err);
            dbMongo.close();
        }
        listadoPuco.forEach((os: any) => {
            dbMongo.collection(coleccion).save({ _id: os.cod_Puco, nombre: os.nombre }, function (err2: any, result: any) {
                if (err2) {
                    console.log('Error save:', err2);
                    dbMongo.close();

                } else {
                    console.log('Se ha insertado:', os);
                    dbMongo.close();
                }
            });
        });
    })
}
