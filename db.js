
const mongoose = require('mongoose')

async function dbconnect()
{
    try
    {
    await mongoose.connect(process.env.DATABASEURL,{ useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        poolSize : 10,
        family : 4
      })
    var con = mongoose.connection;
    return [true,con];
    }
    catch (err)
    {
       return [false];
    }
}

module.exports = {
    dbConnect : dbconnect
}