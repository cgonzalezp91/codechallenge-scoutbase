'use strict'

function errorHandler(error){
    console.error(error)
    throw new Error('Ups, there are some troubles with the server :(, please try again later')
}

module.exports= errorHandler