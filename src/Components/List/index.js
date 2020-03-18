import React, { useState, useEffect } from 'react'
import { useStyletron } from 'baseui'
import { Input } from 'baseui/input'
import { ListItem, ListItemLabel } from 'baseui/list'
import { Avatar } from 'baseui/avatar'
import { Button } from 'baseui/button'
import Search from 'baseui/icon/search'
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem
} from 'baseui/header-navigation'
import './index-styles.scss'

const getFullname = contact => `${contact.lastname} ${contact.firstname}`

function SearchBar({ initialValue, onChangeValue }) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    if (onChangeValue) {
      onChangeValue(value)
    }
  }, [value])

  const SearchIcon = () => {
   const [css, theme] = useStyletron()
    return (
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          paddingLeft: theme.sizing.scale500,
        })}
      >
        <Search size="18px" />
      </div>
    )
  }

  return (
    <div className="SearchBar">
      <Input
        overrides={{ SearchIcon }}
        placeholder="Search in contacts"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  )
}

function ContactsList({ items, filter, onClickItem }) {
  const [data, setData] = useState([])

  useEffect(() => {
    let tmpData = [...items]
    // Sort asc by contact name
    tmpData = tmpData.filter(c => getFullname(c).includes(filter))
    tmpData.sort((c, n) => getFullname(c).localeCompare(getFullname(n)))
    setData(tmpData)
  }, [items, filter])

  return (
    <div className="ContactsList">
      {data.map(contact => (
        <div
          onClick={() => onClickItem ? onClickItem(contact) : null}
          key={contact.id}
        >
          <ListItem
            artwork={() => (
              <Avatar
                name={getFullname(contact)}
                size="scale1200"
              />
            )}
          >
            <ListItemLabel>
              {getFullname(contact)}
            </ListItemLabel>
          </ListItem>
        </div>
      ))}
    </div>
  )
}

function ListComponent(props) {
  const { items, onClickAdd, onClickItem } = props
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="ListComponent">
      {/* Header */}
      <div className="Header">
        <HeaderNavigation>
          <StyledNavigationList $align={ALIGN.left}>
            <StyledNavigationItem>Contacts</StyledNavigationItem>
          </StyledNavigationList>
          <StyledNavigationList $align={ALIGN.center} />
          <StyledNavigationList $align={ALIGN.right}>
            <StyledNavigationItem>
              <Button onClick={onClickAdd}>
                Add
              </Button>
            </StyledNavigationItem>
          </StyledNavigationList>
        </HeaderNavigation>
      </div>

      {/* Search bar */}
      <SearchBar
        initialValue={searchValue}
        onChangeValue={setSearchValue}
      />

      {/* contact list */}
      <ContactsList
        items={items}
        filter={searchValue}
        onClickItem={onClickItem}
      />
    </div>
  )
}

ListComponent.defaultProps = {
  items: [],
}

export default ListComponent
