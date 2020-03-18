import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import List from './Components/List'
import ContactCard from './Components/ContactCard'
import * as mock from './mock'
import './App.scss'

function App(props) {
  const {
    contacts,
    initializeContact,
    updateContact,
    addContact,
    deleteContact
  } = props
  const [action, setAction] = useState('create')

  useEffect(() => {
    initializeContact(mock.contacts)
  }, [])

  return (
    <div className="App">
      <div className="List">
        <List
          items={contacts}
          onClickAdd={() => setAction('create')}
          onClickItem={contact => setAction(contact)}
        />
      </div>

      <div className="Content">
        <ContactCard
          addContact={addContact}
          deleteContact={deleteContact}
          updateContact={updateContact}
          action={action}
          setAction={setAction}
        />
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  initializeContact: data => dispatch({ type: 'INITIALIZE_CONTACT', data }),
  addContact: data => dispatch({ type: 'ADD_CONTACT', data }),
  updateContact: data => dispatch({ type: 'UPDATE_CONTACT', data }),
  deleteContact: id => dispatch({ type: 'DELETE_CONTACT', id }),
})

const getContacts = state => ({
  contacts: state.contacts.get('items').toJS(),
})

export default connect(getContacts, mapDispatchToProps)(App)
