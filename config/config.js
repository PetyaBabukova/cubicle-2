const config = {
    development : {
        PORT : 5000,
        DB_CONNECTION: 'mongodb://localhost/cubicle',
        SALT_ROUNDS: 10,
        SECRET: 'petrovich',
        COOKIE_NAME: USER_SESSION
    },
    production : {
        PORT : 80,
        DB_CONNECTION: 'mongodb+srv://PetyaB:Cubicles.Atlas.2023@cubicles.5bmedkh.mongodb.net/',
        SALT_ROUNDS: 10,
        SECRET: 'petrovich',
        COOKIE_NAME: USER_SESSION
    }
}

module.exports = config[process.env.NODE_ENV.trim()]