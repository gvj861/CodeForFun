const User = require('../models/users')


const signup = (req,res) => {

try{
    console.log(req.body)
    const {email} = req.body  // extracting email and password from req.body
    // destructuring of data
    // instead of writing req.body.email , req.body.password

    User.findOne({email : email},
        (err,user) => {  // user is the object returned from the query
            // that could be used further for calling any methods or using any properties
            if (user){ // any error or no user with that
               return res.status(400).json({status : "fail",error : "Already Registered"})
            }
            else
            {
    var obj = new User(req.body)
    obj.save(
        (err,user) => {  // here user is the full object that is just created
            
                return res.status(200).json({status : "success",msg : "Registered Successfully"});
            
        }
    )
            }
})

}

catch (e)
{
return res.status(500).json({status : "fail",error : "Server Busy, Please try after sometime"})
}
}

module.exports = {signup : signup}