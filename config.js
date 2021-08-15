const { Module } = require("module")

const config = {
    appConfig: {
        host: process.env.APP_HOST,
        port: process.env.APP_PORT, 
    },
    dbConfig:{
        port: process.env.APP_HOST,
        host: process.env.APP_HOST,
    }
}
Module.exports = config