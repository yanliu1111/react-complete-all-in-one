import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import {useState} from 'react';

function App() {
  const [items, setItems] = useState([
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
  return (
    <div className="App">
      <Header title='Grocery List' />
      <Content 
        items = {items}
        handleCheck = {handleCheck}
        handleDelete = {handleDelete}
        />
      <Footer length={items.length}/>
      
    </div>
  );
}

export default App;
