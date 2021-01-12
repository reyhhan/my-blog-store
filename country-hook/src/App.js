import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  
  useEffect(() => {
    if(name!==''){
      axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
      .then(response => {
        setCountry(response.data)
      })
      .catch(error => {
        setCountry('not found')
      })
    }
  },[name])
  
  return country
}

const Country = ({ country }) => {

  if (!country) {
    return null
  }

  if(country==='not found'){
    return(
      <div>
        Not found
      </div>
    )
  }
  return (
    <div>
    {country.map(c => 
      <div key={c.name}>
        <h3>{c.name} </h3>
        <div>capital - {c.capital} </div>
        <div>population - {c.population}</div> 
        <img src={c.flag} height='100' alt={`flag of ${c.name}`}/>
      </div>
      )
    }
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App