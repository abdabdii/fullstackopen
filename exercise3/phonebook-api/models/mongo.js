const mongoose= require('mongoose')

mongoose.connect(process.env.MONGO_CONNECTION)
        .then(()=>{
            console.log("Successfully Connected to the database");
        })
        .catch((err)=>{
            console.log(`${err} Has occured while trying to connect to the data base`);
        })

const contactSchema =new mongoose.Schema({
    name:String,
    number:Number,
})


contactSchema.set('toJSON',{
    transform:(document,returnedObject)=>{
        returnedObject.id=returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v

    }
})

module.exports = mongoose.model('Contact' , contactSchema)