const config = {
    development : {
        PORT : 5000,
        DB_CONNECTION: 'mongodb://localhost/cubicle'
    },
    production : {
        PORT : 80,
        DB_CONNECTION: 'mongodb+srv://PetyaB:Cubicles.Atlas.2023@cubicles.5bmedkh.mongodb.net/'
    }
}

module.exports = config[process.env.NODE_ENV.trim()]