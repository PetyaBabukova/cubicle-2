const User = require('../models/User');

const register = async (userData) =>{
    // Validate

    if (userData.password !== userData.repeatPassword) {
        throw {message: 'Password missmatch'}
    }

    //Hash password

    const user = new User(userData);



};

module.exports = {
    register,
}

