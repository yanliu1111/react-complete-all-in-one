import React from 'react'

const Content = () => {
  const handleNameChange = () => {
    const name =['John', 'Jane', 'Doe'];
    const int = Math.floor(Math.random() * name.length);
    return name[int];
  }
  
  return (
    <main>
      <p>
        Hello {handleNameChange()}!
      </p>
      
    </main>
  )
}

export default Content;
