import Feed from './Feed'
import React from 'react'

const Home = ({posts, fetcherror, isLoading}) => {
  return (
    <main className='Home'>
      {isLoading && <p className='statusMsg'>Loading posts...</p>}
      {!isLoading && fetcherror && <p className='statusMsg' style={{color:"red"}}>Error: {fetcherror}</p>}
      {!fetcherror && !isLoading && (
        posts.length?
        <Feed posts={posts} />
        : <p className='statusMsg'>No posts to display.</p>
      )}
    </main>
  )
}

export default Home
