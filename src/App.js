import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import About from './About';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Missing from './Missing';
import Nav from './Nav';
import NewPost from './NewPost';
import PostPage from './PostPage';
import React from 'react';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState(posts);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const filteredResults = posts.filter(post =>
      ((post.body).toLowerCase().includes(search.toLowerCase()) ||
      (post.title).toLowerCase().includes(search.toLowerCase()))
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);


  const handleDelete = (id) => {
    const postList = posts.filter(post => post.id !== id);
    setPosts(postList);
    navigate('/');
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const datetime = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
  }
  return (
    <div className="App">
      <Header title = 'React JS Blog'/>
      <Nav search={search} setSearch={setSearch}/>
      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route path="/post" 
               element={<NewPost handleSubmit={handleSubmit} 
                                 postTitle={postTitle}
                                 setPostBody={setPostBody}
                                 setPostTitle={setPostTitle}
                                 postBody={postBody}/>} />
        <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />       
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;