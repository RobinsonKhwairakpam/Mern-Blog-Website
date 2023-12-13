import React, { useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import Editor from '../utilities/Editor';

const CreatePost = () => {

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false)

    async function createNewPost(ev) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        ev.preventDefault();
        const response = await fetch('http://localhost:8000/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        });
        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
    <form onSubmit={createNewPost} className='mt-7'>
        <h1 className='font-bold text-2xl mb-4 text-[#292d38]'>Create Post</h1>
        <input 
            className='block w-full mb-3 border-2 border-gray-400 rounded-md p-2 bg-[#fff]'
            type="title"
            placeholder={'Title'}
            value={title}
            onChange={ev => setTitle(ev.target.value)}
        />
        <input 
            className='block w-full mb-3 border-2 border-gray-400 rounded-md p-2 bg-[#fff]'
            type="summary"
            placeholder={'Summary'}
            value={summary}
            onChange={ev => setSummary(ev.target.value)}
        />
        <input 
            className='block w-full mb-3 p-2 '
            type="file"
            onChange={ev => setFiles(ev.target.files)}
        />
        <h1 className='font-bold text-xl mb-4 text-[#292d38]'>Content</h1>
        <Editor             
            value={content} 
            onChange={setContent}
        />
        <button 
            className='bg-[#292d38] px-[15px] py-2 text-[#ececec] mt-3 rounded-md'
        >
            Create post
        </button>
    </form>
    )
}

export default CreatePost