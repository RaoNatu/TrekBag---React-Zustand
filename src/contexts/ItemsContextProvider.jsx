import { createContext, useEffect, useState } from 'react'
import { initialItems } from '../lib/constants'

export const ItemsContext = createContext()

export default function ItemsContextProvider({ children }) {
  const [items, setItem] = useState(
    () => JSON.parse(localStorage.getItem('items')) || initialItems
  )

  const handleAddItem = (itemText) => {
    const newItem = {
      id: new Date().getTime(),
      name: itemText,
      packed: false,
    }

    const newItems = [...items, newItem]
    setItem(newItems)
  }
  const handleDeleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id)
    setItem(newItems)
  }
  const handleToggleItem = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, packed: !item.packed }
      }
      return item
    })
    setItem(newItems)
  }
  const handleRemoveAllItems = () => {
    setItem([])
  }
  const handleResetToInitial = () => {
    setItem(initialItems)
  }
  const handleMarkAllAsComplete = () => {
    setItem(items.map((item) => ({ ...item, packed: true })))
  }
  const handleMarkAllAsInComplete = () => {
    setItem(items.map((item) => ({ ...item, packed: false })))
  }

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  return (
    <ItemsContext.Provider
      value={{
        items,
        handleAddItem,
        handleDeleteItem,
        handleToggleItem,
        handleRemoveAllItems,
        handleResetToInitial,
        handleMarkAllAsComplete,
        handleMarkAllAsInComplete,
      }}
    >
      {children}
    </ItemsContext.Provider>
  )
}
