import { useStoreActions, useStoreState } from 'easy-peasy';

import api from './api/posts'
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
  const posts = useStoreState((state) => state.posts);
  const postTitle = useStoreState((state) => state.postTitle);
  const postBody = useStoreState((state) => state.postBody);
  const savePost = useStoreActions((actions) => actions.savePost);
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
  const setPostBody = useStoreActions((actions) => actions.setPostBody);

  
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const datetime = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const newPost = { id, title: postTitle, datetime, body: postBody };
    savePost(newPost);
    navigate('/');
    // try {
    //   const response = await api.post('/post', newPost);
    //   const allPosts = [...posts, response.data];
    //   setPosts(allPosts);
    //   setPostTitle('');
    //   setPostBody('');
    //   navigate('/');
    // } catch (error) {
    //   console.error('Failed to create new post:', error);
    // }
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
