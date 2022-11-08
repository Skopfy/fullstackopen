import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Person = (props) => {
    const {person} = props
    return (
	    <>
	    <li> {person.name}: {person.number} <Button onClick={deletePerson(props)} text={"Delete"}/> </li>
	    </>
    )
}

const deletePerson = (props) => {
    
    const handler = () => {
	const {person, setPersons, persons} = props
	if (window.confirm(`Do you really want to delete ${person.name}?`)) {
	    personService
		.remove(person.id)
		.then(status => {
		    props.setPersons(props.persons.filter(p => p.id !== person.id))
		    props.setSuccessMessage(`Removed ${person.name}.`)
		    setTimeout(() => {
			props.setSuccessMessage(null)
		    }, 5000)
	    })
	}
    }
    return handler
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const Search = (props) => {
    
    return (
	    <form>
	   Search: <input value={props.search} onChange={props.handleSearchChange} />
	    </form>
    )
}

const AddPerson = (props) => {

    const addPerson = (event) => {
	event.preventDefault()
	const personObject = {
	    name: props.newName,
	    number: props.newNumber,
	    id: props.persons.length + 1,
	}
	const foundExistingPerson = props.persons.find(element => element.name === props.newName)
	if (foundExistingPerson) {
	    replacePerson(personObject, foundExistingPerson)
	} else {
	    personService
		.create(personObject)
		.then(newPerson => {
		    props.setPersons(props.persons.concat(newPerson))
		    props.setNewName('')
		    props.setNewNumber('')
		    props.setSuccessMessage(`Added ${props.newName}.`)
		    setTimeout(() => {
			props.setSuccessMessage(null)
		    }, 5000)
		})
	}
    }

    const replacePerson = (personObject, find) => {
	if (window.confirm(`Do you want to replace the number of ${props.newName}?`)) {
	    personObject.id = find.id
	    personService
		.put(personObject)
		.then(newPerson => {
		    props.setPersons(props.persons.filter(p => p.id !== find.id).concat(newPerson))
		    personObject.id = newPerson.id //case of promise rejected
		    props.setNewName('')
		    props.setNewNumber('')
		    props.setSuccessMessage(`Replaced number of ${props.newName}.`)
		    setTimeout(() => {
			    props.setSuccessMessage(null)
			}, 5000)
		})
		.catch(error => {
		    props.setFailMessage(`${props.newName} was already removed from the server.`)
			setTimeout(() => {
			    props.setFailMessage(null)
			}, 5000)
		    props.setPersons(props.persons.filter(p => p.id !== personObject.id))
		})
	    }
    }
    
    return (
	   <form onSubmit={addPerson}>
        <div>
          Name: <input value={props.newName} onChange={props.handleNameChange}/>
          </div>
	  <div>
	  Number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
	  </div>
        <div>
          <button type="submit">Add Person</button>
        </div>
      </form>
    )
}


const Numbers = (props) => {
    
    return (
	   <ul>
          {(props.personsToShow()).map(person =>
		  <Person key={person.id} person={person} setPersons={props.setPersons} persons={props.persons} setSuccessMessage={props.setSuccessMessage}/>
          )}
      </ul>
    )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='operationSuccess'>
      {message}
    </div>
  )
}


const App = () => {
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('') 
    const [newNumber, setNewNumber] = useState('') 
    const [search, setSearch] = useState('') 
    const [successMessage, setSuccessMessage] = useState(null)
    const [failMessage, setFailMessage] = useState(null)

    useEffect(() =>
	{
	    personService
		.getAll()
		.then(initialData => {
		    setPersons(initialData)
		})
	}, [])


    const handleNameChange = (event) => {
	const name = event.target.value
	setNewName(name)
	if (persons.find(element => element.name === name)) {
	    alert(`${newName} is already added to phonebook`)
	}
    }

    const handleNumberChange = (event) => {
	const number = event.target.value
	setNewNumber(number)
    }

    const handleSearchChange = (event) => {
	const filter = event.target.value
	setSearch(filter)
    }

    const personsToShow = () => {
	if (search === "") {
	    return persons
	}
	const res = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
	return res

    }
    

  return (
    <div>
	  <h2>Phonebook</h2>
          <Search  persons={persons} search={search} setSearch={setSearch} handleSearchChange={handleSearchChange}/>
	  <h2>Add a new contact</h2>
	  <Notification message={successMessage} />
	  <Notification message={failMessage} />
	  <AddPerson  persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} setSuccessMessage={setSuccessMessage} setFailMessage={setFailMessage}/>
	  <h2>Numbers</h2>
	  <Numbers  personsToShow={personsToShow} setPersons={setPersons} persons={persons} setSuccessMessage={setSuccessMessage}/>
    </div>
  )
}

export default App;
