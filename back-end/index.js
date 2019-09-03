'use strict'
const http = require('http'); //We need import http and https to create both servers
const https = require('https'); // we can't create both servers only with express
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const gqlMiddleware = require('express-graphql')
const bodyParser = require("body-parser");
const cors = require("cors");
const { logErrors, errorHandler, notFound } = require("./utils/middlewares/errorHandlers")
const { config } = require('./config')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express()
const corsOptions = {
    //origin: if we only want to be reached by some particular ULR like 'www.google.com'
    origin: '*', //with the * we can be reched by anyone
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//Middlewares
app.use(bodyParser.json()) //Parse all the petitions make to our server
app.use(cors(corsOptions)) // Cross-Origin so anyone can reach our server
const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'utf-8')
const schema = makeExecutableSchema({ typeDefs, resolvers})
app.use('/graphql', gqlMiddleware({
    schema,
    rootValue: resolvers,
    graphiql: true
}))

//Checkin errors and errorHandlers
// app.get('/', function (req, res) {
//     throw new Error('BROKEN') // Express will catch this on its own.
//   })

//ErrorHandlers
app.use(logErrors)
app.use(notFound)
app.use(errorHandler)

http.createServer(app).listen(config.port);
console.log(`Listening http://localhost:${config.port}`)
if (!config.dev) { // https will only be available on production mode
    const sslOptions = {
        key: readFileSync('someSSLPrivateKey'),
        cert: readFileSync('someSSLCertificate'),
        passphrase: config.sslauth
    };
    https.createServer(sslOptions, app).listen(config.sslport);
    console.log(`Listening https://localhost:${config.sslport}`)
}
    

    