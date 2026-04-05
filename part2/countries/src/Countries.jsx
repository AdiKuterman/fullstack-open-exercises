import Weather from "./Weather"

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
        const languages = country.languages ? Object.values(country.languages) : []
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital {country.capital ? country.capital.join(', ') : 'No capital'}</p>
                <p>Area {country.area}</p>
                <h3>Languages</h3>
                {languages.length > 0 ? (
                    <ul>
                        {languages.map(lang => (
                            <li key={lang}>{lang}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No languages listed</p>
                )}
                <img 
                    src={country.flags.png} 
                    alt={`Flag of ${country.name.common}`} 
                    width="150" 
                    />
                {country.capital && country.capital.length > 0 ? 
                (<Weather city={country.capital[0]} />) : (<p>Weather data not available for this region</p>)}
            </div>
        )
    }

    return null
}
export default Countries