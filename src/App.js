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
  const [posts, setPosts] = useState([
    {
      "id": 1,
      "title": "My First Post",
      "datetime": "July 01, 2021 11:17:36 AM",
      "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      "id": 2,
      "title": "My 2nd Post",
      "datetime": "July 01, 2021 11:17:36 AM",
      "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      "id": 3,
      "title": "My 3rd Post edit",
      "datetime": "January 07, 2023 1:15:46 PM",
      "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa! edit"
    },
    {
      "id": 4,
      "title": "My Fourth Post",
      "datetime": "July 01, 2021 11:17:36 AM",
      "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    }
  ]);
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
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home posts={posts} setPosts={setPosts} />} />
        <Route path="/new-post" 
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