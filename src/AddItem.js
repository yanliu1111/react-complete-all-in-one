import { FaPlus } from 'react-icons/fa'
import React from 'react'
import {useRef} from 'react'

const AddItem = ({newItem, setNewItem, handleSubmit}) => {
  const inputRef = useRef();
  return (
    <form className='addForm' onSubmit={handleSubmit}>
      <label htmlFor='addItem'>Add Item:</label>
      <input 
        autoFocus
        ref={inputRef} // useRef to focus on input field after adding an item
        required
        type='text'
        id='addItem'
        placeholder='Add Item...'
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button 
        type='submit'
        aria-label='Add Item'
        onClick={() => {
          inputRef.current.focus() // focus on input field after adding an item
        }}
      >
        <FaPlus />
      </button>
      
    </form>
  )
}

export default AddItem
