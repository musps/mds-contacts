import React, { useState, useEffect } from 'react'
import './index-styles.scss'
import { FormControl } from 'baseui/form-control'
import { Avatar } from 'baseui/avatar'
import { Input } from 'baseui/input'
import { Button, SIZE, KIND } from 'baseui/button'
import { Notification } from 'baseui/notification'
import { createContact } from './../../reducers/contacts'

const getMockContact = () => createContact({}).toJS()

const ErrorMessage = ({ message }) => (
  <Notification
    overrides={{
      Body: { style: { width: '100%' }},
    }}
    kind="negative"
  >
    {() => message}
  </Notification>
)

function ContactCard(props) {
  const { action, setAction, addContact, updateContact, deleteContact } = props
  const [contact, setContact] = useState(getMockContact())
  const [errorMessage, setErrorMessage] = useState('')
  const setValue = (key, value) => setContact({
    ...contact,
    [key]: value,
  })
  const onSubmit = (event) => {
    event.preventDefault()
    if (contact.firstname && contact.lastname && contact.phone) {
      setErrorMessage('')
      if (contact.id) {
        updateContact(contact)
      } else {
        addContact(contact)
        setContact(getMockContact())
      }
    } else {
      setErrorMessage('All fields must be filled!')
    }
  }

  useEffect(() => {
    setErrorMessage('')
    if (action === 'create') {
      setContact(getMockContact())
      setAction('create')
    } else {
      setContact(action)
    }
  }, [action])

  return (
    <div className="ContactCard">
      <form className="form" onSubmit={onSubmit}>
        {errorMessage && (
          <ErrorMessage message={errorMessage} />
        )}

        <br />
        <Avatar
          name={`${contact.lastname} ${contact.firstname}`}
          size="196px"
          src="https://api.adorable.io/avatars/285/10@adorable.io.png"
        />
        <br />
        <br />
        <FormControl label={() => "Firstname"} caption={() => ""}>
          <Input
            value={contact.firstname}
            onChange={e => setValue('firstname', e.target.value)}
          />
        </FormControl>
        <FormControl label={() => "Lastname"} caption={() => ""}>
          <Input
            value={contact.lastname}
            onChange={e => setValue('lastname', e.target.value)}
          />
        </FormControl>
        <FormControl label={() => "Phone"} caption={() => ""}>
          <Input
            value={contact.phone}
            onChange={e => setValue('phone', e.target.value)}
          />
        </FormControl>

        <div className="form__actions">
          <Button size={SIZE.large} type="submit">
            {contact.id ? 'Update' : 'Create'}
          </Button>

          {contact.id && (
            <Button
              onClick={() => {
                deleteContact(contact.id)
                setContact(getMockContact)
                setAction('create')
              }}
              size={SIZE.large}
              kind={KIND.secondary}
              type="button"
            >
              Delete
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

export default ContactCard
