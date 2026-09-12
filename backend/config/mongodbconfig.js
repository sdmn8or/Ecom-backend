const mongoose = require ('mongoose')

let dbConnection = ()=>{
    return mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.qresxqn.mongodb.net/${process.env.MONGODB_DBNAME}?appName=Cluster0`).then(()=>{
        console.log("Database Connected")
    }).catch((err)=>{
        console.log("Database Connection Error : ", err)
    })
}

module.exports = dbConnection