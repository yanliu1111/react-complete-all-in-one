import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy';

import { useNavigate } from 'react-router-dom';

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams()

  const editTitle = useStoreState((state) => state.editTitle);
  const editBody = useStoreState((state) => state.editBody); 

  const editPost = useStoreActions((actions) => actions.editPost);
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
  const setEditBody = useStoreActions((actions) => actions.setEditBody);
  const getPostsById = useStoreState((state) => state.getPostsById);
  const post = getPostsById(id);
  
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
  const handleEdit = (id) => {
    const datetime = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    const updatePost = { id, title: editTitle, datetime, body: editBody };
    editPost(updatePost);
    navigate(`/post/${id}`); 
    // try {
    //   const response = await api.put(`/post/${id}`, updatePost);
    //   // for post id matching, update the post in the state, if not, just return the post which no need to be updated
    //   // ...response.data is used to spread the response data into a new object, which is then used to update the post in the state
    //   // using the map function to create a new array with the updated post
    //   setPosts(posts.map(post => (post.id === id ? { ...response.data } : post)));
    //   setEditTitle('');
    //   setEditBody('');
    //   navigate(`/post/${id}`);
    //   console.log('Post updated successfully:', response.data);
    // }
    // catch (error) {
    //   console.error('Failed to update post:', error);
    // }
  }
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
