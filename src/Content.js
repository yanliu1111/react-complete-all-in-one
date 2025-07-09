import { FaTrashAlt } from 'react-icons/fa';
import React from 'react'

const Content = () => {
const [items, setItems] = React.useState([
  { id: 1, checked:true, item: 'Apples'},
  { id: 2, checked:false, item: 'Bananas' },
  { id: 3, checked:false, item: 'Oranges' }
]);

const handleCheck = (id) => {
  // ternary operator
  const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
  setItems(listItems);
  localStorage.setItem('shoppingList', JSON.stringify(listItems));
}
const handleDelete = (id) => {
  const listItems = items.filter((item) => item.id !== id);
  setItems(listItems);
  localStorage.setItem('shoppingList', JSON.stringify(listItems));
}
  // const handleNameChange = () => {
  //   const names =['John', 'Jane', 'Doe'];
  //   const int = Math.floor(Math.random() * names.length);
  //   setName(names[int]);
  // }
  // const handleClick = () => {
  //   setCount(count + 1);
  //   console.log(`Button clicked ${count + 1} times!`);
  // }
  // const handleClick3 = (name) => {
  //   console.log(count);
  // }
  // const handleClick2 = (e) => {
  //   console.log(e.target.innerText);
  // }
  return (
    <main>
      {items.length ? ( 
        <ul>
          {items.map(item => (
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
              />
            </li>
          ))}
        </ul>
        ): (
          <p style={{ marginTop: '2rem' }}>Your list is empty</p>
        )
      }
      {/* <p>
        Hello {name}!
      </p>
      <button onClick={handleClick}>Click it</button>
      <button onClick={handleNameChange}>Change name</button>
      <button onClick={(e)=>{handleClick2(e)}}>Click it</button> */}
    </main>
  )
}

export default Content;
