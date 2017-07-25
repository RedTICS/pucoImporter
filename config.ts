export const serverSql = {
    server: '10.1.62.53', // You can use 'localhost\\instance' to connect to named instance 
    database: 'Padron',
    options: {
        encrypt: true // Use this if you're on Windows Azure 
    }
}

export const mongoDB= {
        host: 'mongodb://localhost:27017/andes',
        collection:'financiador'
        // host: '10.1.62.17:27017/andes',
    }