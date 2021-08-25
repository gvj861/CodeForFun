const mongoose = require('mongoose')

const Schema = mongoose.Schema

var UserSchema = new Schema({

    firstname : {
        type : String,
        required : true,
        maxlength : 32,   
         // deletes unneccessary spaces

    },
    
    lastname : {
        type : String,
        maxlength : 32,
        
    },

    email : {

        type : String,

        unique : true,   // makes sure every email is used only once

        

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
    },

    state : {
        type : String,
            },

    city : {
        type : String,
            },

    pincode : {
        type : String,
      
    }


})

module.exports = mongoose.model('User',UserSchema,'users') // will make user collection