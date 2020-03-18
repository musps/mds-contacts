import { List, Map } from 'immutable'
import {
  INITIALIZE_CONTACT,
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
} from '../constants/contacts'

export const createContact = ({ id, firstname, lastname, phone }) => Map({
  id: id ?? null,
  firstname: firstname ?? '',
  lastname: lastname ?? '',
  phone: phone ?? '',
})

const initialState = Map({
  id: 1,
  items: List(),
})

const initialzeContacts = (state, action) => {
  const { data } = action
  let id = state.get('id')
  const items = data.map(item => {
    id = id + 1
    return createContact({
      ...item,
      id,
    })
  })

  return state
    .set('id', id)
    .set('items', List(items))
}

const addContact = (state, action) => {
  const { data } = action
  const newContact = createContact({
    ...data,
    id: state.get('id')
  })

  return state
    .set('id', state.get('id') + 1)
    .set('items', state
      .get('items')
      .push(newContact)
    )
}

const updateContact = (state, action) => {
  const { data } = action
  const index = state.get('items').findIndex(i => i.get('id') === data.id)
  if (index === -1) {
    return state
  }

  const updateItems = state.get('items').update(index, (contact) => {
    return contact
      .set('firstname', data.firstname)
      .set('lastname', data.lastname)
      .set('phone', data.phone)
  })

  return state.set('items', updateItems)
}

const deleteContact = (state, action) => {
  const deleteIndex = state.get('items').findIndex(i => i.get('id') === action.id)
  if (deleteIndex === -1) {
    return state
  }

  return state.set('items', state.get('items').delete(deleteIndex))
}

const contacts = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_CONTACT:
      return initialzeContacts(state, action)
    case ADD_CONTACT:
      return addContact(state, action)
    case UPDATE_CONTACT:
      return updateContact(state, action)
    case DELETE_CONTACT:
      return deleteContact(state, action)
    default:
      return state
  }
}

export default contacts
