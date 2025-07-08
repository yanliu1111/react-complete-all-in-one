import React from 'react'

const Content = () => {
const [name, setName] = React.useState('Yan');
const [count, setCount] = React.useState(0);  


  const handleNameChange = () => {
    const names =['John', 'Jane', 'Doe'];
    const int = Math.floor(Math.random() * names.length);
    setName(names[int]);
  }
  const handleClick = () => {
    setCount(count + 1);
    console.log(`Button clicked ${count + 1} times!`);
  }
  const handleClick3 = (name) => {
    console.log(count);
  }
  const handleClick2 = (e) => {
    console.log(e.target.innerText);
  }
  return (
    <main className='content'>
      <p>
        Hello {name}!
      </p>
      <button onClick={handleClick}>Click it</button>
      <button onClick={handleNameChange}>Change name</button>
      <button onClick={(e)=>{handleClick2(e)}}>Click it</button>
    </main>
  )
}

export default Content;
