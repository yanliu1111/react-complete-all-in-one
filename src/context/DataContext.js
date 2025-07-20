import { createContext, useEffect, useState } from "react";

import api from '../api/posts';
import useAxiosFetch from '../hooks/useAxiosFetch';
import { useNavigate } from 'react-router-dom';
import useWindowSize from '../hooks/useWindowSize';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState(posts);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const { data, isLoading, error } = useAxiosFetch('http://localhost:3500/post');


  useEffect(() => {
	setPosts(data);
  }, [data]);
  
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
    <DataContext.Provider value={{
      width, isLoading, error, posts, setPosts, postTitle, setPostTitle,
      search, setSearch, searchResults, setSearchResults,
      setPostBody, handleSubmit, postBody,
      handleEdit, editBody, setEditBody, editTitle, setEditTitle, handleDelete
    }}>
      {children}
    </DataContext.Provider>
  );
}

