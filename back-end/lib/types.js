'use strict'
const db = require('./db.json')

module.exports = {
    Movies: {
        actors: ({actors}) => {
            let actorData = []
            let ids
            ids = actors ? actors.map(_id => _id) : []
            if (ids.length > 0){ 
            
            db.actors.forEach((actor) => {                
                 ids.forEach(id => {
                        if (actor._id === id) {
                            actorData.push(actor)                            
                        }
                    })
                })
            }
            else []            
            return actorData
        }
        
    },
    Actors: {
        directors: ({directors}) => {
            let directorsData = []
            let ids
            ids = directors ? directors.map(_id => _id) : []
            if (ids.length > 0){ 
            
            db.directors.forEach((directors) => {                
                 ids.forEach(id => {
                        if (directors._id === id) {
                            directorsData.push(directors)                            
                        }
                    })
                })
            }
            else []            
            return directorsData
        }
    }

}