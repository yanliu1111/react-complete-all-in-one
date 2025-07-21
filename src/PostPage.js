import { Link, useParams } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy';

import api from './api/posts'
import { useNavigate } from 'react-router-dom';

const PostPage = () => {
    const { id } = useParams();
    const deletePost = useStoreActions((actions) => actions.deletePost);
    const getPostsById = useStoreState((state) => state.getPostsById);
    const post = getPostsById(id);
    const navigate = useNavigate();
    const handleDelete =  (id) => {
        deletePost(id);
        navigate('/');
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