const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { SALT_ROUNDS, SECRET } = require('../config/config');

const ENGLISH_ALPHNUMERIC_PATTERN = /^[a-zA-Z0-9]+$/;


const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,

    username: {
        type: String,
        required: true,
        unique: true, // !!! this is checking the index too. Search for DB Indexing. Don`t use it, if you don`t need index.
        minlength: 5,
        // validate: {
        //     validator: (value) =>{
        //          return /^[a-zA-Z0-9]+$/.test(value)
        //     },
        //     message: (props)=> `${props.value} is invalid username. Username should consist only English letters and digits!`
        //     
        // }
        validate: {
            validator: function (v) {
                // Check if the username contains only English letters and numbers
                return ENGLISH_ALPHNUMERIC_PATTERN.test(v);
            },
            message: props => `${props.value} is not a valid username!`

        }
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: function (v) {
                // Check if the username contains only English letters and numbers
                return ENGLISH_ALPHNUMERIC_PATTERN.test(v);
            },
            message: props => `Passsword should consist only English letters and digits!`
        }
    }

});

// Validations demo:

userSchema.pre('save', function (next) { //It`s important to use expression because we need "this"
    bcrypt.genSalt(SALT_ROUNDS)
        .then(salt => {
            return bcrypt.hash(this.password, salt)
        })
        .then(hash => {
            console.log(hash);
            this.password = hash;
            next();
        })
        .catch(err => {
            //TODO
            console.log(err);
        })
})

module.exports = mongoose.model('User', userSchema);