import React, { useState, useRef } from 'react'
import "../style/createpost.scss"
import { usePost } from '../hook/usePost'
import { useNavigate } from 'react-router'

const CreatePost = () => {

    const [ caption, setCaption ] = useState("")
    const postImageInputFieldRef = useRef(null)

    const navigate = useNavigate()

    const { loading, handleCreatePost } = usePost()

    async function handleSubmit(e) {
        e.preventDefault()
        const file = postImageInputFieldRef.current.files[ 0 ]

        await handleCreatePost(file,caption)

        navigate('/')

    }

    if(loading){
        return (
            <main>
                <p>Creating Post</p>
            </main>
        )
    }

    return (
        <main className='createPost'>
            <p>Create New Post</p>
            <form className='post-form' onSubmit={handleSubmit}>
                <input className='post-image' type="file" name="postImage" id="postImage" ref={postImageInputFieldRef} />
                <input onChange={(e)=>{setCaption(e.target.value)}} type="text" name='caption' placeholder='Enter caption..' value={caption}/>
                <button type='submit' className='button'>Create Post</button>
            </form>
        </main>

    )
}

export default CreatePost