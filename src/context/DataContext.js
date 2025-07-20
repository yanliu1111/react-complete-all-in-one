import { createContext, useEffect, useState } from "react";

import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState(posts);
  const { data, isLoading, error } = useAxiosFetch('http://localhost:3500/post');

  useEffect(() => {
	setPosts(data);
  }, [data]);
  
  useEffect(() => {
    const filteredResults = posts.filter(post =>
      (post?.body?.toLowerCase().includes(search.toLowerCase()) ||
      post?.title?.toLowerCase().includes(search.toLowerCase()))
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);
     
  return (
    <DataContext.Provider value={{
      isLoading, error, posts, setPosts,
      search, setSearch, searchResults, setSearchResults
    }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;

