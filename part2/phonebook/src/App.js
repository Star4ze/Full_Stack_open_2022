import { useState, useEffect } from 'react'
import personsService from './services/personsService'

const Filter = ({ handleSearchChange }) =>
  <div>
    filter shown with <input onChange={handleSearchChange} />
  </div>


const PersonForm = (props) =>
  <form onSubmit={props.addName}>
    <div>
      name: <input value={props.newName} onChange={props.handleNameChange} />
    </div>
    <div>
      number: <input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

const Persons = (props) => {
  const persons = props.handleSearch.length === 0 ? props.persons : props.persons.filter(
    person => person.name.toLowerCase().includes(props.handleSearch.toLowerCase())
  )

  return (<ul>
    {persons.map(person =>
      <li key={person.name}>{person.name} {person.number}
        <button onClick={() => { props.removePerson(person) }}>delete</button>
      </li>)}
  </ul>)
}

const Notification = ({ message }) => {
  if (message) {
    const style = {
      color: message.type === 'alert' ? 'red' : 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
    return <div style={style}>{message}</div>
  }
  else
    return null
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState()

  const [handleSearch, setSearch] = useState([])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleSearchChange = (event) => setSearch(event.target.value)

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const handleDuplicates = (val) => {
    for (const k of persons) {
      if (k.name === val)
        return k
    }
    return false
  }

  const addName = (event) => {
    event.preventDefault()
    const duplicate = handleDuplicates(newName)
    if (duplicate === false) {
      const nameObject = { name: newName, number: newNumber }
      personsService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNotification(`${newName} added`)
          setTimeout(() => { setNotification(null) }, 5000)
          setNewName('')
          setNewNumber('')
        }).catch(error => {
          setNotification(error.response.data.error)
          setTimeout(() => { setNotification(null) }, 5000)
          console.log(error.response.data.error)
        })
    }
    else {
      if (window.confirm(`${newName} is already added to phonebook replace old number with a new one?`)) {
        const nameObject = { name: newName, number: newNumber }
        personsService
          .update(duplicate.id, nameObject)
          .catch(error => {
            setNotification(error.response.data.error)
            setTimeout(() => { setNotification(null) }, 5000)
            console.log(error.response.data.error)
          })
        const index = persons.indexOf(duplicate)
        const newArr = [...persons]
        newArr[index] = nameObject
        setPersons(newArr)
      }
      setNewName('')
      setNewNumber('')
    }
  }

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .remove(person.id)
        .catch(() => { setNotification(`Information of ${person.name} has already removed from server`) })
        .then(() => {
          const index = persons.indexOf(person)
          setTimeout(() => { setNotification(null) }, 5000)
          const newArr = [...persons.slice(0, index), ...persons.slice(index + 1, persons.length)]
          setPersons(newArr)
        })
    }
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter handleSearchChange={handleSearchChange} />

      <h3>Add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons
        persons={persons}
        handleSearch={handleSearch}
        removePerson={removePerson} />
    </div>
  )
}

export default App