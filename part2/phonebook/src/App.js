import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Person = ({person}) => {
    return (
	    <>
	    <li> {person.name}: {person.number} </li>
	    </>
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
	personService
	    .create(personObject)
	    .then(newPerson => {
		props.setPersons(props.persons.concat(newPerson))
		props.setNewName('')
		props.setNewNumber('')
	    })
	
	
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
          <Person key={person.id} person={person} />
          )}
      </ul>
    )
}


const App = () => {
    const [persons, setPersons] = useState([]) //List
    const [newName, setNewName] = useState('') //Input
    const [newNumber, setNewNumber] = useState('') //Input
    const [search, setSearch] = useState('') //Input

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
	  <AddPerson  persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
	  <h2>Numbers</h2>
	  <Numbers  personsToShow={personsToShow}/>
    </div>
  )
}

export default App;
