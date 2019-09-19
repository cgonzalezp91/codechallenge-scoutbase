'use strict'

const db = require('../config/db.json')
//This can be a module if we use it in some other place
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = {
    movies: (root, token) =>{
        if (token.token){
            const movies = db.movies.map(movie =>{
                movie.scoutbase_rating = getRandomArbitrary(5.0, 9.0)
            })
            return movies

        }            
        else
            return db.movies
        
              
    
    },
    getPeople: () => {return db.actors.concat(db.directors)}, // To Many same field names so i can create an interface
    // getDirectors: () => {return db.directors}
}