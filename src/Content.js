import ItemList from './ItemList'
import React from 'react'

const Content = ({items, handleCheck, handleDelete}) => {
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
    <>
      {items.length ? ( 
        <ItemList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
        ): (
          <p style={{ marginTop: '2rem' }}>Your list is empty</p>
        )}
      {/* <p>
        Hello {name}!
      </p>
      <button onClick={handleClick}>Click it</button>
      <button onClick={handleNameChange}>Change name</button>
      <button onClick={(e)=>{handleClick2(e)}}>Click it</button> */}
    </>
  )
}

export default Content;
