import Feed from './Feed'
import { useStoreState } from 'easy-peasy';

const Home = () => {
  const { searchResults, fetcherror, isLoading } = useStoreState((state) => ({
    searchResults: state.searchResults,
    fetcherror: state.fetcherror,
    isLoading: state.isLoading
  }));
  return (
    <main className='Home'>
      {isLoading && <p className='statusMsg'>Loading posts...</p>}
      {!isLoading && fetcherror && <p className='statusMsg' style={{color:"red"}}>Error: {fetcherror}</p>}
      {!fetcherror && !isLoading && (
        searchResults.length?
        <Feed posts={searchResults} />
        : <p className='statusMsg'>No posts to display.</p>
      )}
    </main>
  )
}

export default Home
