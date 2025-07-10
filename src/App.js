import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import SearchItems from './SearchItem';
import TestPage from './TestPage';

function App() {
  const API_URL = 'http://localhost:3500/items';
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState(''); 
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not receive expected data');
        const listItems = await response.json();
        setItems(listItems);
        // console.log('items fetched', listItems);
        setFetchError(null);
      } catch (err) {
        // console.error(err.message);
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchItems();
  }
  , []); // empty array means it runs once when the component mounts, it not recreates the effect on every render
  
  
  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const newItem = { id, checked: false, item};
    const listItems = [...items, newItem];
    setItems(listItems);
  };
  const handleCheck = (id) => {
    // ternary operator
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);
  }
  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  }
  const handleSubmit = (e) => {
    e.preventDefault(); // stops page from reloading
    if (!newItem) return;
    addItem(newItem);
    setNewItem(''); // clear input field
  }
  
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <Header title="Grocery List" />
              <AddItem
                newItem={newItem}
                setNewItem={setNewItem}
                handleSubmit={handleSubmit}
              />
              <SearchItems search={search} setSearch={setSearch} />
              <main>
                {isLoading && <p>Loading items...</p>}
                {fetchError && !isLoading && <p style={{ color: 'red' }}>{`Error: ${fetchError}`}</p>}
                {!fetchError && 
                  <Content
                    items={items.filter(i =>
                      ((i.item ?? '').toLowerCase()).includes(search.toLowerCase())
                    )}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                  />}
              </main>
              <Footer length={items.length} />
            </div>
          }
        />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
