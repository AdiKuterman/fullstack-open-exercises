import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Filter'
import PersonsForm from './PersonsForm'
import Persons from './Persons'
import Notification from './Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const personsToShow = filter === ''
  ? persons
  : persons.filter(person => 
      person.name.toLowerCase().includes(filter.toLowerCase())
    )

  const addPerson = (event) => {
    event.preventDefault()

    const trimmedName = newName.trim()
    const existingPerson = persons.find(p => p.name.trim().toLowerCase() === trimmedName.toLowerCase())

    const nameObject = {
      name: trimmedName,
      number: newNumber
    }

    if (existingPerson) {
      if(window.confirm(`${trimmedName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = {...existingPerson, number: newNumber}

        personService
        .update(changedPerson.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
          setSuccessMessage(`Updated ${returnedPerson.name}'s number`)
          setTimeout(() => {setSuccessMessage(null)}, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage(`Information of ${changedPerson.name} has already been removed from server`)
          setPersons(persons.filter(p => p.id !== changedPerson.id))
          setNewName('')
          setNewNumber('')
          setTimeout(() => {setErrorMessage(null)}, 5000)
        })
      }
      return
    }

    personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setSuccessMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {setSuccessMessage(null)}, 5000)
        setNewName('')
        setNewNumber('')
      })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => setFilter(event.target.value)

  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
          setErrorMessage(`Information of ${name} has already been removed from server`)
          setPersons(persons.filter(p => p.id !== id))
          setNewName('')
          setNewNumber('')
          setTimeout(() => {setErrorMessage(null)}, 5000)
      })
    }
  }

  useEffect(() => {
  personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} className="success" />
      <Notification message={errorMessage} className="error" />
      <Filter value={filter} onChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonsForm  onSubmit={addPerson} newName={newName} handleNameChange={handleNameChange}
                    newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App