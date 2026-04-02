import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

const addPerson = (event) => {
  event.preventDefault()

  const trimmedName = newName.trim()
  const isDuplicate = persons.some(person => person.name.trim().toLowerCase() === trimmedName.toLowerCase())

  if (isDuplicate) {
    alert(`${trimmedName} is already added to phonebook`)
    return 
  }

  const nameObject = {
    name: trimmedName
  }

  setPersons(persons.concat(nameObject))
  setNewName('')
}

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => 
          <p key={person.name}>{person.name}</p>
        )}
      </div>
    </div>
  )
}

export default App