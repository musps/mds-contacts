import React, { useState, useEffect } from 'react'
import './index-styles.scss'
import { FormControl } from 'baseui/form-control'
import { Avatar } from 'baseui/avatar'
import { Input } from 'baseui/input'
import { Button, SIZE, KIND } from 'baseui/button'

const mockContact = {
  id: null,
  firstname: '',
  lastname: '',
  phone: '',
}

function ContactCard(props) {
  const { action, setAction, addContact, updateContact, deleteContact } = props
  const [contact, setContact] = useState(mockContact)
  const setValue = (key, value) => setContact({
    ...contact,
    [key]: value,
  })
  const onSubmit = (event) => {
    event.preventDefault()
    if (contact.firstname && contact.lastname && contact.phone) {
      if (contact.id) {
        updateContact(contact)
      } else {
        addContact(contact)
        setContact(mockContact)
      }
    }
  }

  useEffect(() => {
    if (action == 'create') {
      setContact(mockContact)
    } else {
      setContact(action)
    }
  }, [action])

  return (
    <div className="ContactCard">
      <form className="form" onSubmit={onSubmit}>
        <Avatar
          name={`${contact.lastname} ${contact.firstname}`}
          size="196px"
          src="https://api.adorable.io/avatars/285/10@adorable.io.png"
        />
        <br />
        <br />
        <FormControl label={() => "Firstname"} caption={() => "caption"}>
          <Input
            value={contact.firstname}
            onChange={e => setValue('firstname', e.target.value)}
          />
        </FormControl>
        <FormControl label={() => "Lastname"} caption={() => "caption"}>
          <Input
            value={contact.lastname}
            onChange={e => setValue('lastname', e.target.value)}
          />
        </FormControl>
        <FormControl label={() => "Phone"} caption={() => "caption"}>
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
                setContact(mockContact)
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
