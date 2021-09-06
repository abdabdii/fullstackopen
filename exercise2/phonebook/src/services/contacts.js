import axios from 'axios'

const baseURL="http://localhost:3001/persons"

const getAll= () =>{
    const request = axios.get(baseURL)
    return request.then((response)=> response.data)
}


const deleteContact= (id) =>{
    const request = axios.delete(`${baseURL}/${id}`)
   return request.then(()=> true)
}

const addContact = (object) =>{
    const request= axios.post(baseURL,object)
    return request.then((response)=>response.data)
}

const updateContact = (id,object) =>{
    const request= axios.put(`${baseURL}/${id}`,object)
    return request.then((response)=>response.data)
}


const contacts= {
    getAll,
    deleteContact,
    addContact,
    updateContact
}

export default contacts;