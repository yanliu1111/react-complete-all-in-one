import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import About from './About';
import EditPost from './EditPost';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Missing from './Missing';
import Nav from './Nav';
import NewPost from './NewPost';
import PostPage from './PostPage';
import React from 'react';
import api from './api/posts';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState(posts);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
        try {
            const response = await api.get('/post');
            setPosts(response.data);
        } catch (error) {
            if (error.response) {
                console.log(error.response.data)
                console.log(error.response.status)
                console.log(error.response.headers)
            } else {
                console.log(`Error: ${error.message}`)
            }
        }
    }
    fetchPosts();
},[])
  
  useEffect(() => {
    const filteredResults = posts.filter(post =>
      (post?.body?.toLowerCase().includes(search.toLowerCase()) ||
      post?.title?.toLowerCase().includes(search.toLowerCase()))
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleEdit = async (id) => {
	const datetime = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
	const updatePost = { id, title: editTitle, datetime, body: editBody };
	try {
		const response = await api.put(`/post/${id}`, updatePost);
		// for post id matching, update the post in the state, if not, just return the post which no need to be updated
		// ...response.data is used to spread the response data into a new object, which is then used to update the post in the state
		// using the map function to create a new array with the updated post
		setPosts(posts.map(post => (post.id === id ? { ...response.data } : post)));
		setEditTitle('');
		setEditBody('');
		navigate(`/post/${id}`);
		console.log('Post updated successfully:', response.data);
	}
	catch (error) {
		console.error('Failed to update post:', error);
	}
  }
  
  const handleDelete = async (id) => {
    try{
      await api.delete(`/post/${id}`);
      const postList = posts.filter(post => post.id !== id);
      setPosts(postList);
      navigate('/');
    } catch (error) {
      console.error('Failed to create new post:', error);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const datetime = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const newPost = { id, title: postTitle, datetime, body: postBody };

    try {
      const response = await api.post('/post', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    } catch (error) {
      console.error('Failed to create new post:', error);
    }
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
        <Route path="/edit/:id" 
               element={<EditPost posts={posts}
								 handleEdit={handleEdit} 
                                 editTitle={editTitle}
								 setEditTitle={setEditTitle}
								 editBody={editBody}
								 setEditBody={setEditBody}
								/>} />
		<Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />       
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;