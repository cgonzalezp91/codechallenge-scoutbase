'use strict'
// These are the defualt errors of express, but 
// This way we can define or own coustom Errors with express
const { config } = require('../../config')

function withErrorStack(err, stack) {
    if (config.dev) {
        return { ...err, stack }
    }
}

function logErrors(err, req, res, next) {
    console.log(err.stack)
    next(err)
}
function notFound(err, req, res, next) {
    if (err.message.match(/not found/)) {
        return res.status(404).send({ error: err.message });
    }
    res.status(500).send({ error: err.message });
}

function errorHandler(err, req, res, next) {
    const { output: { statusCode, payload } } = err

    res.status(statusCode)
    res.render("error", withErrorStack(payload, err.stack))
}
module.exports = {
    logErrors,    
    errorHandler,
    notFound 
}