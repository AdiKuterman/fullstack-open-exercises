const Countries = ({countriesToShow, onShow}) => {
    if (countriesToShow.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }

    if (countriesToShow.length > 1) {
        return (
            <div>
            {countriesToShow.map(country => 
            <div key={country.cca3}>
                {country.name.common}
                <button onClick={() => onShow(country.name.common)}>show</button>
            </div>
            )}
            </div>
        )
    }

    if (countriesToShow.length === 1) {
        const country = countriesToShow[0]
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital {country.capital}</p>
                <p>Area {country.area}</p>
                <h3>Languages</h3>
                <ul>
                {Object.values(country.languages).map(lang => (
                    <li key={lang}>{lang}</li>
                ))}
                </ul>
                <img 
                    src={country.flags.png} 
                    alt={`Flag of ${country.name.common}`} 
                    width="150" 
                />
            </div>
        )
    }

    return null
}
export default Countries