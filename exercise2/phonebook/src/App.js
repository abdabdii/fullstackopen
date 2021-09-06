
import React , {useState,useEffect} from "react"
import contacts from "./services/contacts"


function App() {
  const [phones, setPhones] = useState([])
  const [contactName, setContactName] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [message, setMessage] = useState([])
  useEffect(() => {
    contacts
      .getAll()
      .then(response => setPhones(response))
    
  }, [])

  // Handle click of delete
  const handleClick = (id) => {

    // get name of deleted record
    const deleted=phones.find(item=>item.id===id)
    // confirm deletion
    const wantToProcessed =window.confirm(`do you want to delete ${deleted.name} ?`)
    if(wantToProcessed){
      //making request to the api to delete the record
      contacts
      .deleteContact(id)
      //If success update The state with the item deleted
      .then(()=>{setPhones(phones.filter(item=>item.id!==id)); setMessage([true,`${deleted.name} has been removed from your phone book`])}) 
    }
   
  }

  //Handle submit of new record
  const handleSubmit = (e) =>{
    e.preventDefault();
    //Check if the contact name exists
    const exists = phones.find((item)=>item.name===contactName)
    
    //if it exists pop up a confirm window if the user wants to procced and change the phone number for the existing one
    if(exists){
      const confirmUpdate=window.confirm(`do you want to update ${contactName} with ${contactPhone} ?`)
      if(confirmUpdate){
        contacts
          .updateContact(exists.id,{...exists , name:contactName , number:contactPhone})
          .then((response) =>{setPhones(phones.map((item)=>item.id!==exists.id?item:response)); setMessage([true,`${contactName} has been updated with new number`])})
          .catch(()=>setMessage([false,"Oops! Looks like the contact you want to update already deleted."]))
          
      }
    }
    
    // else use the add contact mthod to add new record to the data base
    else{
      contacts
        .addContact({number:contactPhone,name:contactName})
        .then((response)=>{setPhones(phones.concat(response)); setMessage([true,`${response.name} has been added to your phone book`])})

    }
    setContactPhone("")
    setContactName("")

  }
  const success={
    padding:"10px",
    border:"solid 2px green",
    color:"green"

  }

  const error={
    padding:"10px",
    border:"solid 2px red",
    color:"red"

  }
  
  return (
    
    <>
    <h2>Add Contact</h2>
    {message[0]?<h3 style={success} >{message[1]}</h3>:message[0]===false?<h3 style={error} >{message[1]}</h3>:""}
    <form onSubmit={handleSubmit} >
      <label htmlFor="name" >Contact Name: <input value={contactName} onChange={(e)=>setContactName(e.target.value)} name="name"/></label><br />
      <label htmlFor="phone" >Contact Phone: <input value={contactPhone} onChange={(e)=>setContactPhone(e.target.value)} name="phone"/></label><br />
      <button type="submit" >Add Contact</button>

    </form>
    {phones.map((item ,i)=>
      (
        <div key={item.id} >
          <p><b>Contact:</b>  {item.name} {item.number} <button onClick={()=>{handleClick(item.id)}} >Delete</button></p>
          
        </div>
      )
      )}
    </>
  )
}

export default App;
