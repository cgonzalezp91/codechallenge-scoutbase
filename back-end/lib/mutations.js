'use strict'

const bcrypt = require('bcrypt') //Encrytp Passwords with bcrypt
const uniqid = require('uniqid') //Generating Unic ID for mutations
let dbParse = require('../config/db.json')
const { join } = require('path')
const { writeFile } = require('fs').promises
//let dbParse = //JSON.parse(db.users)

module.exports = {
    createUser: async (root, { input }) => {
        const pass = await bcrypt.hash(input.password, 10)
            // Store hash in your password DB.
        let userData = {
            _id: uniqid(),
            name: input.username,
            password: pass,
        }
        dbParse.users.push(userData)
        let db = JSON.stringify(dbParse, null, 2)
        let token = '123'
        await writeFile(join(__dirname, '..', 'config', 'db.json'), db)
        return {
            token: token,
            user: userData            
        }
    },
    login: async (root, {input}) =>{
        let userData = []
        let token = '123'
        for(let user of dbParse.users){ //dbParse.users.forEach(async user => {
            // ids.forEach(async id => {
            if(user.name === input.username ){
                try {
                    const match = await bcrypt.compare(input.password, user.password)
                    if (match){
                        userData = user
                        break
                    }
                } catch (error) {
                    console.error(error)
                }
            }
           }//)
           return {
            token: token,
            user: userData  
           }
    }
}