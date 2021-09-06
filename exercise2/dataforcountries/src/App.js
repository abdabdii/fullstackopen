import axios from 'axios'
import {useState,useEffect} from 'react'
import Country from './Country/Country'


function App() {
  const [data, setData] = useState([])
  const [realData, setRealData] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState()
  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response)=>setRealData(response.data))
    
  }, [])
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(search)
      if(search===""){
        setData(realData)
      }else if(realData.length>0){
        const filtered=realData.filter((item)=>item.name.toLowerCase().search(search.toLowerCase()) > -1)
        setData(filtered)
      }
    }, 3000)

    return () => clearTimeout(delayDebounceFn)
  }, [search])
  
  return (
    <>
      <label htmlFor="country">Country Name<input onChange={(e) =>setSearch(e.target.value)} name="country" value={search} /> </label>
      {data.length>10?"Too many searches results":data.length===1?data.map((item)=><Country data={item} key={item.alpha3Code} shido="true"/>):data.length>1&&data.length<=10?data.map((item)=><Country data={item} key={item.alpha3Code}/>):""}
    </>
  );
}

export default App;
