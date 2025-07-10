import { FaTrashAlt } from 'react-icons/fa'
import React from 'react'

const LineItem = ({item, handleCheck, handleDelete}) => {
  return (
    <li className='item' key={item.id}>
      <input 
        type="checkbox" 
        onChange={() => handleCheck(item.id)}
        checked={item.checked}
        />
      <label
        onDoubleClick={() => handleCheck(item.id)} 
        // onDoubleClick, it is an event handler that is triggered when the user double clicks on the element
        style={(item.checked) ? { textDecoration: 'line-through' } : null}
        htmlFor=''>{item.item}</label>
      <FaTrashAlt 
        onClick={() => handleDelete(item.id)}
        role='button' 
        tabIndex='0'
        aria-label={`Delete ${item.item}`} // aria-label is used for accessibility, it provides a label for screen readers
      />
    </li>
  )
}

export default LineItem
