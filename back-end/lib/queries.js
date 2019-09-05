'use strict'

const db = require('../config/db.json')

module.exports = {
    movies: () => {return db.movies},
    getPeople: () => {return db.actors.concat(db.directors)}, // To Many same field names so i can create an interface
    // getDirectors: () => {return db.directors}
}