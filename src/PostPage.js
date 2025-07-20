import { Link, useParams } from 'react-router-dom'

import DataContext from './context/DataContext'
import api from './api/posts'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

const PostPage = () => {
    const { posts, setPosts } = useContext(DataContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const post = posts.find(post => (post.id).toString() === id);
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
  return (
    <main className='PostPage'>
        <article className='post'>
            {post && 
                <>
                    <h2>{post.title}</h2>
                    <p className='postDate'>{post.datetime}</p>
                    <p className='postBody'>{post.body}</p>
                    <Link to={`/edit/${post.id}`}><button className='editButton'>Edit Post</button></Link>
                    <button className='deleteButton' onClick={() => handleDelete(post.id)}>
                        Delete Post
                    </button>
                </>
            }
            {!post &&
                <>
                    <h2>Post Not Found</h2>
                    <p>
                        <Link to="/">Visit our Homepage</Link>
                    </p>
                </>
            }
        </article>
    </main>
  )
}

export default PostPage