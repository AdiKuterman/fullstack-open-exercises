import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import Countries from './Countries'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [filter, setFilter] = useState('')

  const countriesToShow = allCountries.filter(country => 
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  const handleFilterChange = (event) => setFilter(event.target.value)

  const handleShowClick = (countryName) => {setFilter(countryName)}

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log('promise fulfilled')
        setAllCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      <Countries countriesToShow={countriesToShow} onShow={handleShowClick}/>
    </div>
  )
}

export default App