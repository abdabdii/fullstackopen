import {React,useState} from 'react';
import './App.css';


function Button({name, onClickMethod , color}){
  return (
    <button onClick={onClickMethod} style={{backgroundColor:color,fontSize:"11px",width:"100px",height:"16px",padding:"10px",display:'flex',alignItems:"center",justifyContent:"center"}}>{name}</button>
  )
}

function Text({text , color , value}){
  
  return(
    <tr>
    <td><p style={{color:color,fontSize:"15px"}}>{text}: </p></td>
    {
      text==="Positive" ? <td> {value.toFixed(2)} %</td> :<td> {value.toFixed(2)}</td>
    }
    
    </tr>
  )
}

function Stats({good , natural , bad}){
  const all=good + natural + bad
  const avg= (good-bad) !==0 ?(good - bad)/all:0
  const positive= good !==0 ?good/all:0
  
  if(good===0 && natural===0 && bad===0){return <tr><td><p>No records to have a feedback yet</p></td></tr>}
  return(
    <>
    <Text text="All" color="#00e676" value={all} />
    <Text text="Average" color="#82b1ff" value={avg} />
    <Text text="Positive" color="#f50057" value={positive*100} />
    </>

  )
      
      
    
    
}

function App() {

  const [good,setGood]=useState(0)
  const [natural,setNatural]=useState(0)
  const [bad,setBad]=useState(0)

  const handleClick = (value , setValue) => () => setValue(value+1)
  
  return (
    <>
      <h2>Give Feedback</h2>
      <Button name="Good" onClickMethod={handleClick(good,setGood)} color="#00e676" />
      <Button name="Natural" onClickMethod={handleClick(natural,setNatural)} color="#82b1ff" />
      <Button name="Bad" onClickMethod={handleClick(bad,setBad)} color="#f50057" />

      <h2>Statistics</h2>
      <table>
        <tbody>
        <Text text="Good" color="#00e676" value={good} />
        <Text text="Natural" color="#82b1ff" value={natural} />
        <Text text="Bad" color="#f50057" value={bad} />

      
        <Stats good={good} bad={bad} natural={natural} />
        </tbody>
      </table>
      
    </>
  );
}

export default App;
