import DataContext from './context/DataContext'
import Feed from './Feed'
import { useContext } from 'react'

const Home = () => {
  const { searchResults, fetcherror, isLoading } = useContext(DataContext);
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
