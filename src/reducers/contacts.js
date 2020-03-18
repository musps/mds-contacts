import { List, Map } from 'immutable'

export const createContact = ({ id, firstname, lastname, phone }) => Map({
  id,
  firstname,
  lastname,
  phone,
})

const initialState = Map({
  id: 1,
  items: List(),
})

const contacts = (state = initialState, action) => {
  const { data } = action

  switch (action.type) {
    // --------------------------------------------------------
    // --------------------------------------------------------
    case 'INITIALIZE_CONTACT':
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
    // --------------------------------------------------------
    // --------------------------------------------------------
    case 'ADD_CONTACT':
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
    // --------------------------------------------------------
    // --------------------------------------------------------
    case 'UPDATE_CONTACT':
      const nextItems = state.get('items').map((contact) => {
        if (contact.get('id') === data.id) {
          contact.set('firstname', data.firstname)
          contact.set('lastname', data.lastname)
          contact.set('phone', data.phone)
        }
        return contact
      })

      return state.set('items', nextItems)
    // --------------------------------------------------------
    // --------------------------------------------------------
    case 'DELETE_CONTACT':
      return state
        .set('items', state
          .get('items')
          .filter(contact => contact.get('id') !== action.id)
        )
    default:
      return state
  }
}

export default contacts
