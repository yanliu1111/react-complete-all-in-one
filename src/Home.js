import Feed from './Feed'
import React from 'react'

const Home = ({posts}) => {
  return (
    <main className='Home'>
      {posts.length ? (
        <Feed posts={posts} />
      ) : ( <p style={{marginTop:"2em"}}>No posts to display</p>

      ) }
    </main>
  )
}

export default Home
