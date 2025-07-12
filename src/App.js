import { Route, Routes } from 'react-router-dom';
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
  return (
    <div className='App'>
      <Header title = 'React JS Blog' />
      <Nav />
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route exact path="/post/:id" element={<PostPage />} />
        <Route path="/about" element={<About />} /> */}
      </Routes> 
      <Footer />
    </div>
  );
};

export default App;