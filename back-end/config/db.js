'use strict'
const { MongoClient } = require('mongodb')
const {DB_USER, DB_PWD, DB_HOST, DB_PORT, DB_NAME} = process.env

const mongoUrl = `mongodb://${DB_USER}:${DB_PWD}@${DB_HOST}:${DB_PORT}`
let connection
async function connectDB(){
    if (connection) return connection //Just connect to the pool one time

    let client
    try {
        client = await MongoClient.connect(mongoUrl,{
            useNewUrlParser: true
        })
        connection = client.db(DB_NAME)        
    } catch (error) {
        console.error('Could not connect to DB', mongoUrl, error)
        process.exit(0)
    }
    return connection
}

module.exports = connectDB