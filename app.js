require('dotenv').config()

const mongoose = require('mongoose')
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const cors = require('cors')  // for resource sharing
app.use(cors())

//setting secure HTTP headers
const helmet = require('helmet')
app.use(helmet())

const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')

// sanitizing data mWares clean up malware data

app.use(xss());

app.use(mongoSanitize());



// DB connection
// all sensitive information inside .env file
// mongoose.connect(process.env.DATABASEURL,{ useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
//   }).then(()=>{                     // simple arrow function that executes if connected
//       console.log("Connected to DB")
//   }).catch(()=>{
//       console.log(" DB Connection Error")
//   })

// middlewares


require('./db').dbConnect().then((result) => {

    if (result.length == 2)
    {
        var con = result[1];
        console.log("Connected to db");
        app.use(express.json({ extended: false }));

//app.use(bodyParser.urlencoded({extended: true}))
app.use('/',bodyParser.json())
// basically tells the system that you want json to be used.
// it is same as urlencoded parser returns the middleware

app.use('/',cookieParser())

//app.use('/api',require('./routes/auth'))  // as app.use() is a middleware
app.post('/api/signup', async (req,res) => {

    try
    {
    con.collection("users").insertOne( req.body, (err,newObj)=>{
        if (err)
        {
            res.status(500).json({status : "fail",error : "Server Busy, Please try after sometime","mainError" : err.toString()})
        }
        else
        {
            return res.status(200).json({status : "success",msg : "Registered Successfully",obj : newObj});
     
        }
    });

    }
    catch (e)
    {
        res.status(500).json({status : "fail",error : "Internal Server Error"})
    }

})

    }
    else
    {
        console.log("Not Connected")
    }
})




// app.use(express.json({ extended: false }));

// //app.use(bodyParser.urlencoded({extended: true}))
// app.use('/',bodyParser.json())
// // basically tells the system that you want json to be used.
// // it is same as urlencoded parser returns the middleware

// app.use('/',cookieParser())


const port = process.env.PORT || 4000  // if env variable present then connect to that port

//app.use('/api',require('./routes/auth'))  // as app.use() is a middleware


// starting server
app.listen(port,()=>{
    console.log(`Listening at port ${port}`)
})