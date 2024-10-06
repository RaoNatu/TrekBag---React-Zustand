import { useRef, useState } from 'react'
import Button from './Button'

export default function AddItemForm({ onAddItem }) {
  const [itemText, setItemText] = useState('')
  const inputRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()

    // Guard Statement
    if (!itemText) {
      alert("Item can't be empty")
      inputRef.current.focus()
      return
    }

    // Add item
    onAddItem(itemText)
    setItemText('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add an item</h2>
      <input
        ref={inputRef}
        type="text"
        value={itemText}
        onChange={(e) => setItemText(e.target.value)}
        autoFocus
      />
      <Button>Add to list</Button>
    </form>
  )
}
