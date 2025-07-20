import DataContex from './context/DataContext'
import React from 'react'
import { useContext } from 'react'

const NewPost = () => {
  const { setPostTitle, setPostBody, handleSubmit, postTitle, postBody } = useContext(DataContex)
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
