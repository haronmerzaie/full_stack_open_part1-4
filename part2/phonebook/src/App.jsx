import React, { useState, useEffect } from 'react';
import phonebookService from './phonebookServices';

const Filter = ({ searchTerm, handleSearch }) => (
  <div>
    Filter by name: <input value={searchTerm} onChange={handleSearch} />
  </div>
);

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson }) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

const Persons = ({ filteredPersons, handleDelete }) => (
  <ul>
    {filteredPersons.map((person) => (
      <li key={person.id}>
        {person.name} {person.number}
        <button onClick={() => handleDelete(person.id)}>Delete</button>
      </li>
    ))}
  </ul>
);

// Message Component for showing notifications
const Message = ({ message, type }) => {
  if (message === null) {
    return null;
  }
  return <div className={type}>{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('success');

  useEffect(() => {
    phonebookService.getAll()
      .then(response => {
        setPersons(response.data);
      })
      .catch(error => {
        setMessage("Failed to fetch data from the server");
        setMessageType('error');
        setTimeout(() => setMessage(null), 5000);
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    
    const existingPerson = persons.find(p => p.name === newName);
    
    if (existingPerson) {
        if (existingPerson.number !== newNumber) {
            if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
                phonebookService.update(existingPerson.id, { ...existingPerson, number: newNumber })
                    .then(response => {
                      console.log('Update response:', response.data);
                      setPersons(persons.map(p => p.id !== existingPerson.id ? p : response.data));
                      setNewName('');
                      setNewNumber('');

                      setMessage(`Number for ${newName} updated successfully!`);
                      setMessageType('success');
                      setTimeout(() => setMessage(null), 5000);
                    })
                    .catch(error => {
                      setMessage("Failed to update the number");
                      setMessageType('error');
                      setTimeout(() => setMessage(null), 5000);
                    });
            }
        } else {
            alert(`${newName} is already added to the phonebook.`);
        }
        return;
    }

    const newPerson = {
        name: newName,
        number: newNumber
    };

    phonebookService.create(newPerson)
    .then(response => {
        setPersons(persons.concat(response.data));
        setNewName('');
        setNewNumber('');

        setMessage(`Added ${newName}!`);
        setMessageType('success');
        setTimeout(() => setMessage(null), 5000);
    })
    .catch(error => {
        setMessage("Failed to add person");
        setMessageType('error');
        setTimeout(() => setMessage(null), 5000);
    });
};

  
  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearch = (event) => setSearchTerm(event.target.value);
  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete this entry?")) {
      phonebookService.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));

          setMessage("Entry deleted successfully");
          setMessageType('success');
          setTimeout(() => setMessage(null), 5000);
        })
        .catch(error => {
          console.error('Error deleting person:', error);
          setMessage("The person was already removed from the server or another error occurred");
          setMessageType('error');
          setTimeout(() => setMessage(null), 5000);
          setPersons(persons.filter(p => p.id !== id));
        });
    }
  };
  

  const filteredPersons = searchTerm
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : persons;

    return (
      <div>
        <h2>Phonebook</h2>
  
        <Message message={message} type={messageType} />
  
        <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
  
        <h3>Add a new</h3>
  
        <PersonForm
          newName={newName}
          newNumber={newNumber}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          addPerson={addPerson}
        />
  
        <h3>Numbers</h3>
  
        <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
      </div>
    );
  };
  
  export default App;
