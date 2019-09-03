'use strict'

const db = require('./db.json')

module.exports = {
    getMovies: () => {return db.movies},
    getActors: () => {return db.actors},
    getDirectors: () => {return db.directors}
}