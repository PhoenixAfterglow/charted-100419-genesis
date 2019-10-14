require('dotenv').config();


config = {
    "development": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "host": process.env.DB_HOSTNAME,
        "dialect": "mysql"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    "production": {
        "username": process.env.DB_USERNAMEP,
        "password": process.env.DB_PASSWORDP,
        "database": process.env.DB_NAMEP,
        "host": process.env.DB_HOSTNAMEP,
        "dialect": "mysql",
        "operatorsAliases": false
    }
}



module.exports = config;