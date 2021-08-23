const mongoose = require('mongoose')

const Schema = mongoose.Schema

var UserSchema = new Schema({

    firstname : {
        type : String,
        required : true,
        maxlength : 32,   
        trim : true  // deletes unneccessary spaces

    },
    
    lastname : {
        type : String,
        maxlength : 32,
        trim : true
    },

    email : {

        type : String,

        unique : true,   // makes sure every email is used only once

        trim : true,

        required : true
    },

    // could add many other fields later
    mobilenumber : {
        type : String,
        trim : true,
        unique : true
    },

    courses : {
        type : String,
        trim : true
    },

    queries : {
        type : String,
        trim : true
    },

    state : {
        type : String,
        trim : true
    },

    city : {
        type : String,
        trim : true
    },

    pincode : {
        type : String,
        trim : true
    }


})

module.exports = mongoose.model('User',UserSchema,'users') // will make user collection