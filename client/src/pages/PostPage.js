import {useContext, useEffect, useState} from "react";
import {Link, Navigate, useParams} from "react-router-dom";
import {formatISO9075} from "date-fns";
import { UserContext } from "../context/UserContext";

// import {Link} from 'react-router-dom';

export default function PostPage() {

  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext); 
  const [redirect, setRedirect] = useState(false) 

  useEffect(() => {
    fetch(`http://localhost:8000/post/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setPostInfo(postInfo);
        });
      });
  }, [id]);

  const deletePost = async () => {
    const response = await fetch(`http://localhost:8000/delete/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    if (response.ok) {
      alert('Post deleted')
      setRedirect(true)
    }    
  }

  if(redirect){
    return <Navigate to={'/'} />
  }
  

  //return empty if there is no post info
  if(!postInfo)
    return ''

  return (
    <div className="mt-8 mb-16">
      <h1 className="text-gray-800 font-bold text-3xl mb-1 tracking-wide">
        {postInfo.title}
      </h1>
      <time className="text-neutral-500 text-[14px]">
        {formatISO9075(new Date(postInfo.createdAt))}
      </time>

      <div className="flex justify-between items-center mt-1 mb-2">
        <div className="font-semibold text-neutral-600 text-[15px]">
            by @{postInfo.author?.username}
        </div>
        {userInfo?.id === postInfo.author?._id && (
            <div className="flex gap-2">
            <div className="shadow-sm">
                <Link 
                    className="inline-flex bg-green-600 px-3 py-2 text-[#fff] justify-center items-center rounded-md gap-1" 
                    to={`/edit/${postInfo._id}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                    <span className="text-[14px]">
                        Edit 
                    </span>                    
                </Link>
            </div>
            <div className="shadow-sm" onClick={deletePost}>
                <div 
                    className="inline-flex bg-red-600 px-3 py-2 text-[#fff] justify-center items-center rounded-md gap-1 hover:cursor-pointer" 
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>

                    <span className="text-[14px]">
                        Delete
                    </span>                    
                </div>
            </div>
            </div>
        )}
      </div>

      <div className="mt-4">
        <img 
            src={`http://localhost:8000/${postInfo.cover}`} 
            alt=""
            className="overflow-hidden w-full max-h-[450px] object-center object-cover rounded-md"
        />
      </div>
      {/* printing HTML from a string */}
      <div 
        className="mt-4 text-[24px] font-semibold text-neutral-800" 
        dangerouslySetInnerHTML={{__html: postInfo.content}} 
      />
    </div>
  )
}