import { useState, useEffect } from "react"
import { getAll, create, deleteById, update } from "./services/phonebook"
import Person from "./components/Person"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import Error from "./components/Error"

function App() {

  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({
    name: "",
    number: ""
  })
  const [filtered, setFiltered] = useState("")
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    getAll()
    .then((res) => {
      setPersons(res.data)
    })
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    if(!newPerson.name || !newPerson.number) {
      return
    }

    for(let person of persons) {
      if(person.name === newPerson.name) {
        if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)) {

          const updatePerson = {
            name: newPerson.name,
            number: newPerson.number,
            id: person.id
          }
          
          replace(person.id, updatePerson)
          setNewPerson({ name: "", number: "" })

          setSuccess(`Replaced ${person.name}'s number`)

          setTimeout(() => {
            setSuccess(null)
          }, 5000)
        }
        return
      }
    }

    const person = {
      name: newPerson.name,
      number: newPerson.number,
      id: persons.length + 1
    }

    create(person)
    .then((res) => {
      setPersons(persons.concat(res.data))
    })

    setNewPerson({ name: "", number: "" })

    setSuccess(`Added ${person.name}`)

    setTimeout(() => {
      setSuccess(null)
    }, 5000)
  }

  function deletePerson(id, name) {
    if (window.confirm(`Delete ${name} ?`)) {
      deleteById(id)

    setError(`Infomation of ${name} has been removed from server`)

    setTimeout(() => {
      setError(null)
    }, 5000)
    }
  }

  function replace(id) {
    const person = {
      name: newPerson.name,
      number: newPerson.number,
      id: id
    }
    update(id, person)
  }

  function handleSetName(e) {
    setNewPerson({...newPerson, name: e.target.value})
  }

  function handleSetNumber(e) {
    setNewPerson({...newPerson, number: e.target.value})
  }

  function handleSetFilter(e) {
    setFiltered(e.target.value)
  }

  const filteredPerson = filtered ? persons.filter((person) => person.name.startsWith(filtered)) : persons

  return (
    <div>
      <h2>Phonebook</h2>

      {success !== null ? <Notification message={success}/> : ""}
      {error !== null ? <Error message={error}/> : ""}

      <Filter handleSetFilter={handleSetFilter}/>

      <h2>add a new</h2>
      <PersonForm 
        handleSubmit={handleSubmit} 
        handleSetName={handleSetName} 
        handleSetNumber={handleSetNumber}
      />

      <h2>Numbers</h2>
      {filteredPerson.map((person) => (
        <Person key={person.id} person={person} deletePerson={deletePerson} />
      ))}
    </div>
  )
}

export default App