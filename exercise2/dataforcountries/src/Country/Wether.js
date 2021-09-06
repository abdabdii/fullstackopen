



const Wether = ({cityName,wether,connection})=> {
    
    
    
    
        if(connection==="done"){
            return (
                <>
                <h2>Weather In {cityName}</h2>
                <p><b>Temprature :</b> {wether.main.temp -273}</p>
                {<img src={`http://openweathermap.org/img/wn/${wether.weather[0].icon}.png`} alt={`${cityName}-temprature`} width="150px" height="150px" />}
                {<p><b>Wind: </b>{`${wether.wind.speed} mph and in ${wether.wind.deg} degrees`}</p>}

                </>
            )


        }else{
            return(<p>Failure</p>)
        }
        
    
}








export default Wether 