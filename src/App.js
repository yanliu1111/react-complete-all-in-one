import { Route, Routes } from 'react-router-dom';

import About from './About';
import EditPost from './EditPost';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Missing from './Missing';
import Nav from './Nav';
import NewPost from './NewPost';
import PostPage from './PostPage';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';

const App = () => {
	const setPosts = useStoreActions((actions) => actions.setPosts);
	const { data, isLoading, error } = useAxiosFetch('http://localhost:3500/post');

	useEffect(() => {
		setPosts(data);
	}, [data, setPosts]);

  	return (
		<div className="App">
			<Header title = 'React JS Blog' />
				<Nav/>
				<Routes>
					<Route path="/" element={<Home isLoading={isLoading} fetchError = {error}/>} />
					<Route path="/post" element={<NewPost />} />
					<Route path="/edit/:id" element={<EditPost />} />
					<Route path="/post/:id" element={<PostPage />} />       
					<Route path="/about" element={<About />} />
					<Route path="*" element={<Missing />} />
				</Routes>
			<Footer />
		</div>
  	);
};

export default App;