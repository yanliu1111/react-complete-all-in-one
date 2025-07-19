import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import React from 'react'

const EditPost = ({
  posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle
}) => {
  const { id } = useParams()
  const post = posts.find(post => (post.id).toString() === id)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (post) {
      setEditTitle(post.title)
      setEditBody(post.body)
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }, [post, setEditTitle, setEditBody])
  return (
    <main className='NewPost'>
      {editTitle &&
        <>
          <h2>Edit Post</h2>
          <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="postTitle">Title:</label>
            <input 
              type='text' 
              required 
              value={editTitle} 
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder='Post Title'
            />
            <label htmlFor="postBody">Post:</label>
            <textarea 
              id='postBody' 
              required 
              value={editBody} 
              onChange={(e) => setEditBody(e.target.value)}
              placeholder='Post Body'
            />
            <button type='submit' onClick={()=>handleEdit(post.id)}>Submit</button>
          </form>
        </>
      }
      {!editTitle &&
        <>
            <h2>Page Not Found</h2>
            <p>
                <Link to="/">Visit our Homepage</Link>
            </p>
        </>
      }
    </main>
  )
}

export default EditPost
