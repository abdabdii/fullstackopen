import React, {useState ,useEffect,useRef} from 'react'
import Wether from './Wether'
import Details from './Details'
import axios from "axios"

const Country = ({data ,shido}) => {
    const [show, setShow] = useState(false)
    const [wether, setWether] = useState({})
    const [connection, setConnection] = useState('idle')
    const buttonRef = useRef(null)

   useEffect(() => {
       console.log(shido);
       if(shido){
           console.log("No OK");
           buttonRef.current.click()
       }
   }, [])

    const handleClick = () => {
        setShow((prev)=>!prev)
        // Get data for weather
        if(connection!=="done"){
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${data.capital}&appid=${process.env.REACT_APP_API_KEY}`)
            .then((response)=>{
                console.log(response.data)
                setWether(response.data)
                setConnection('done')
            }).catch((e)=>{console.log(e); setConnection('error')})

        }
       

    }
    // if(show1===true){
    //     show1=false
    //     clickButton.current.click();
        
    // }
    return (
        <div>
            <p>{data.name} <button ref={buttonRef} onClick={handleClick}>{show===true?"Hide":"Show"}</button></p>
            
            {show?
            <>
            <Details data={data} key={data.alpha2Code} />
            <Wether cityName={data.capital} key={data.capital} wether={wether} connection={connection}/>
            </>
            
            :""}
           
        </div>
    )
}

export default Country
