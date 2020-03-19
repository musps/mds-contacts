import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import List from './Components/List'
import ContactCard from './Components/ContactCard'
import {
  initializeContact,
  addContact,
  updateContact,
  deleteContact,
} from './actions/contacts'
import * as mock from './mock'
import './App.scss'

function App(props) {
  const { contacts, dispatch } = props
  const [action, setAction] = useState('create')

  useEffect(() => {
    dispatch(initializeContact(mock.contacts))
  }, [])

  return (
    <div className="App">
      <div className="List">
        <List
          items={contacts}
          action={action}
          onClickAdd={() => setAction('create')}
          onClickItem={contact => setAction(contact)}
        />
      </div>

      <div className="Content">
        <ContactCard
          addContact={data => dispatch(addContact(data))}
          deleteContact={id => dispatch(deleteContact(id))}
          updateContact={data => dispatch(updateContact(data))}
          action={action}
          setAction={setAction}
        />
      </div>
    </div>
  )
}

const getContacts = state => ({
  contacts: state.contacts.get('items').toJS(),
})

export default connect(getContacts)(App)
