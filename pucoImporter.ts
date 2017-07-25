import * as sql from 'mssql';

export class servicioMssql {

    getObrasSociales(usuario: any, password: any, server: any, db: any, consulta: any) {
        var connection = {
            user: usuario,
            password: password,
            server: server,
            database: db,
            //connectionTimeout: config.connectionTimeout,
            requestTimeout: 190000,
            stream: true,
            //  applicationIntent: 'readOnly'
        };
        var listaRegistros: any[] = [];

        return new Promise((resolve: any, reject: any) => {
            sql.connect(connection, function (err: any) {
                if (err) {
                    console.log("Error de Conexión sql", err);
                    reject(err);
                }

                var request = new sql.Request();
                request.stream = true;
                request.query(consulta);
                // Puede ser una consulta a una vista que tenga toda la información

                request.on('row', function (row: any) {
                    // Emitted for each row in a recordset
                    listaRegistros.push(row);
                });

                request.on('error', function (err: any) {
                    // May be emitted multiple times
                });

                request.on('done', function (affected: any) {
                    // Always emitted as the last one
                    console.log(listaRegistros.length);
                    sql.close();
                    resolve(listaRegistros);
                });

            });
            sql.on('error', function (err: any) {
                console.log("Error de conexión", err);
                reject(err);
            });
        });  //Fin Promise

    }
}