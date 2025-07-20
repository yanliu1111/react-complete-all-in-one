import { useContext, useState } from 'react'

import DataContext from './context/DataContext'
import React from 'react'
import api from './api/posts'
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const { posts, setPosts } = useContext(DataContext);
  const navigate = useNavigate();
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
    <main className='NewPost'>
      
        <h2>New Post</h2>
        <form className='newPostForm' onSubmit={handleSubmit}>
            <label htmlFor="postTitle">Title:</label>
        <input 
          type='text' 
          required 
          value={postTitle} 
          onChange={(e) => setPostTitle(e.target.value)}
          placeholder='Post Title'
        />
        <label htmlFor="postBody">Post:</label>
        <textarea 
          id='postBody' 
          required 
          value={postBody} 
          onChange={(e) => setPostBody(e.target.value)}
          placeholder='Post Body'
        />
        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}

export default NewPost
