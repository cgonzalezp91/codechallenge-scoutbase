'use strict'

const bcrypt = require('bcrypt') //Encrytp Passwords with bcrypt
const uniqid = require('uniqid') //Generating Unic ID for mutations
let dbParse = require('../config/db.json')
const errorHandler = require('../utils/graphqlErrorHandler.js')
const { join } = require('path')
const { writeFile } = require('fs').promises
const { AUTH_JWT_SECRET } = process.env
const { sign } = require('jsonwebtoken')

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
        for(let user of dbParse.users){
            if(user === userData.name)
                throw new Error('Email already used')
        }
        dbParse.users.push(userData)
        let db = JSON.stringify(dbParse, null, 2)
        
        const token = sign({userId: dbParse._id}, AUTH_JWT_SECRET, { expiresIn: "15min"})
        try { 
            await writeFile(join(__dirname, '..', 'config', 'db.json'), db)
            return {
                token: token,
                user: userData            
            }
        } catch (error) {
            errorHandler(error)
        }
    },
    login: async (root, {input}) =>{
        let userData = []
        const token = sign({userId: dbParse._id}, AUTH_JWT_SECRET, { expiresIn: "15min"})
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
                    errorHandler(error)
                }
            }
           }//)
           return {
            token: token,
            user: userData  
           }
    }
}