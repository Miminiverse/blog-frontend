
import React, {useEffect, useState, useContext, useRef} from 'react';
import axios from 'axios';
import {UserOauthContext} from "../context/UserContext";
import { io, Socket } from 'socket.io-client';
import REPLY from "../assets/reply.png";

export default function SingleComment({comment, todo}) {

    const {userOauth, setUserOauth, comments, setComments}= useContext(UserOauthContext)
    const [openReply, setOpenReply] = useState(false)
    const [commentValue, setCommentValue] = useState("")


    const handleChange = (e) => {
        setCommentValue(e.target.value)
    }

    const handleClick = () => {
        setOpenReply(!openReply)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

              
        const url = `http://localhost:5051/api/v1/oauth/todos/comment/create`
        try {
            fetch(url, 
                {
                body: JSON.stringify({
                    content: commentValue,
                    username: userOauth._doc._id,
                    todoId: todo,
                    parentId: comment._id
                }),
                method:"POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            }
            )
            .then(res => res.json())
            .then((data) => {
                console.log(data.result[0])
                setComments(prev => [...prev, data.result[0]])
                setCommentValue("")
                setOpenReply(false)
            })

          } catch (error) {
            console.log(error);
        }
    }
     return (
        <>
        <div>
            <div className='p-2 m-2 bg-slate-400 rounded-md'>
            {comment ?  (
                <>
                <div>
                <div
                className="items-left text-md font-semibold text-gray-600">                
                {comment.username?.username}: {comment.content}
                </div>
                </div>
                </>
            ): null}
            <button
            onClick={handleClick}
            className='text-red-300 text-sm'
            >
             <img className="ml-4 h-4 w-4" src={REPLY} alt='reply' />
            </button>
            </div>

            {openReply && 
            <div>
             <form onSubmit={handleSubmit}>
                <div className='flex flex-row gap-2 items-center justify-center'>
             <input 
             type="text"
             value={commentValue}
             onChange={handleChange}
             placeholder='Write your comment'
             className='bg-gray-50 border border-gray-300 p-2 ml-4 rounded-lg'
             />
             <button 
             className='p-2'
             type="submit">Add</button>
                </div>
             </form>
             </div>
           
            }
           
          
        </div>

        
        </>
    )
}
