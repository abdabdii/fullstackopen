import React from 'react'

const Details = ({data}) => {
    return (
        <div>
            <h2>{data.name}</h2>
            <p>Capital: {data.capital}</p>
            <p>Languages:</p>
            <ul>
                {data.languages.map((item)=><li key={item.name}>{item.name}</li>)}
            </ul>
            <img src={data.flag} alt={data.name +"Flag"} width="150px" height="150px" />
        </div>
    )
}

export default Details
