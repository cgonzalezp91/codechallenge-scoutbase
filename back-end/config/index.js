require('dotenv').config()

const config = {
    dev: process.env.NODE_ENV !== 'production',
    port: process.env.PORT,    
    authJwtSecret: process.env.AUTH_JWT_SECRET,
    sslport: process.env.SSLPORT, //Port to lunch app With SSL (https)
    sslauth: process.env.SSLAUTH //Auth to use SSL (https)
}

module.exports = { config }