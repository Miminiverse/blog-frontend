
import React, {useEffect, useState, useContext, useRef} from 'react';
import axios from 'axios';
import {UserOauthContext} from "../context/UserContext";
import { io, Socket } from 'socket.io-client';
import REPLY from "../assets/reply.png";

export default function SingleComment({comment, todo}) {

    const {userOauth, setUserOauth, comments, setComments}= useContext(UserOauthContext)
    const [openReply, setOpenReply] = useState(false)
    const [commentValue, setCommentValue] = useState("")

    console.log(comments)

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
                    todoId: todo._id,
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
            <div className='mb-2 p-2'>
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
             <input 
             type="text"
             value={commentValue}
             onChange={handleChange}
             className='bg-gray-50 border border-gray-300 p-2 rounded-lg'
             />
             <button type="submit"> Send Reply</button>
             </form>
            </div>
            }
           
          
        </div>

        
        </>
    )
}
