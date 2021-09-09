require('dotenv').config()
const express = require('express')
const cors=require('cors')
const morgan = require('morgan')
const Contact = require('./models/mongo')
const { response } = require('express')

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }




const app = express()
app.use(cors())
app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));
app.use(errorHandler)

// 9BWmlD3WEOw98bu5
// user123

const port = 3002

const getID = (arr)=>{
    const maxNow=Math.max(...arr.map((item)=>item.id))

    return maxNow + 1
}



// Get persons
app.get('/api/persons',(req , res) => {
    Contact.find({})
            .then((contacts)=>{
                res.json(contacts)
                
            })
})


//Create new person
app.post('/api/persons',(req,res)=>{
    const person=req.body
    

    //Make sure that name and number are entered
    if(person.name===undefined ||person.number===undefined){
        return res.status(400).json({ 
            error: 'content missing' 
          })
    }


    //Make object of Contact to add new record to the database
    const contact=new Contact({
        name:person.name,
        number:person.number
    })
    
    contact.save().then(savedContact=>res.json(savedContact))
    

})

app.put('/api/persons/:id',(req,res)=>{
    const person=req.body
    

    //Make sure that name and number are entered
    if(person.name===undefined ||person.number===undefined){
        return res.status(400).json({ 
            error: 'content missing' 
          })
    }


    //Make object of Contact to update existing record to the database
    const contact=({
        name:person.name,
        number:person.number
    })
    
    Contact.findByIdAndUpdate(req.params.id,contact,{ new: true })
    .then((updatedNote=>{
        res.json(updatedNote)
    }))
    .catch(err=>next(err))
    

})





//Get basic info 
app.get('/info',(req,res)=>{
    const timeNow=new Date()
    Contact.countDocuments({},function(err,count) {
        res.send(`
                    <p>Phonebook has info for ${count} people</p>
                    <p>${timeNow}</p>
                `
    )
    })
    
})

//Get single person information
app.get('/api/persons/:id',(req,res)=>{
   Contact.findById(req.params.id)
   .then((record)=>{
       if(record){
           res.json(record)
       }else{
           res.status(404).end()
       }
   })
   .catch(err=>next(err))
})

// Delete person information
app.delete('/api/persons/:id',(req,res)=>{
    Contact.findByIdAndRemove(req.params.id)
    .then(result=>{
        res.status(204).end()
    })
    .catch(err=>next(err))
})


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})