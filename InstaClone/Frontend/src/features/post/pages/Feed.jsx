import React, { useEffect } from 'react'
import "../style/feed.scss"
import Post from '../components/Post'
import { usePost } from '../hook/usePost'
import Navbar from '../../shared/Navbar'

const Feed = () => {

    const { feed, handleGetFeed,loading } = usePost()

    useEffect(() => { 
        handleGetFeed()
    }, [])

    if(loading || !feed){
        return (<main><p>Feed is loading...</p></main>)
    }

    return (
        <main className='feed-page' >
            <Navbar/>
            <div className="feed">
                <div className="posts">
                    {feed.map(post=>{
                        return <Post key={post._id} user={post.user} post={post} loading={loading}>
                        </Post>
                    })}
                </div>
            </div>
        </main>
    )
}

export default Feed