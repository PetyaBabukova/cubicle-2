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
    let salt = await bcrypt.genSalt(SALT_ROUNDS)
    let hash = await bcrypt.hash(password, salt)

    const user = new User({ username, password: hash });
    // console.log(user);

    return await user.save(); //await is not mandatory here

};

const login = async ({ username, password }) => {
    // Get user from DB
    let user = await User.findOne({ username });

    if (!user) throw { message: 'User not found' };

    // Compare password hash
    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw { message: "Password does not match!" }
    console.log(isMatch);

    // Generate token
    let token = jwt.sign({ _id: user._id }, SECRET);

    return token;

}

module.exports = {
    register,
    login,
}

