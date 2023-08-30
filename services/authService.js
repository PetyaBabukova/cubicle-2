const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const { SALT_ROUNDS, SECRET } = require('../config/config');
const User = require('../models/User');

const register = async ({ username, password }) => {
    // // Validate here - this is also an option
    // if (userData.password !== userData.repeatPassword) {
    //     throw {message: 'Password missmatch'}
    // }

    // TODO: If such username exist

    //Hash password

    // Don`t need try/catch here, because we cach error in the controller
    //console.log(SALT_ROUNDS);
    // let salt = await bcrypt.genSalt(SALT_ROUNDS) //We moved this in the User model // This is done in User Schema
    // let hash = await bcrypt.hash(password, salt) // This is done in User Schema

    // const user = new User({ username, password: hash }); // This is done in User Schema
    const user = new User({ username, password}); //In way we use Mongoose validation (in the schema). The password is converted to hash in the User Schema.
    // console.log(user);

    return user.save(); //await is not mandatory here

};

const login = async ({ username, password }) => {
    // Get user from DB
    let user = await User.findOne({ username });

    if (!user) throw { message: 'User not found' };

    // Compare password hash
    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw { message: "Password does not match!" }
    //console.log(isMatch);

    // Generate token
    let token = jwt.sign({ _id: user._id,  }, SECRET); //In the token we can put also username, roles, etc.

    return token;

}

module.exports = {
    register,
    login,
}

