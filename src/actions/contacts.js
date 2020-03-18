import {
  INITIALIZE_CONTACT,
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
} from '../constants/contacts'

export const initializeContact = data => ({ type: INITIALIZE_CONTACT, data })
export const addContact = data => ({ type: ADD_CONTACT, data })
export const updateContact = data => ({ type: UPDATE_CONTACT, data })
export const deleteContact = id => ({ type: DELETE_CONTACT, id })
