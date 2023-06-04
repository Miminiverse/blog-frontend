
import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {UserOauthContext} from "../context/UserContext";
import { io, Socket } from 'socket.io-client';

export default function Comment({todo}) {

    const {userOauth, setUserOauth}= useContext(UserOauthContext)
    const [content, setContent] = useState<string>("")
    const [comments, setComments] = useState()

    const handleCreateComment = (e) => {
        e.preventDefault()
        
        const url = `http://localhost:5051/api/v1/oauth/todos/comment/create/${todo._id}/${userOauth._doc._id}`
        try {
            fetch(url, 
                {
                body: JSON.stringify({
                    content
                }),
                method:"POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then((data) => {
               console.log(data);
               setContent("")
            })
          } catch (error) {
            console.log(error);
        }
        }

        const fetchComment = () => {
            
            const url = `http://localhost:5051/api/v1/oauth/todos/comment/${todo._id}`
            try {
            
                fetch(url, 
                    {
                    method:"GET",
                    credentials: "include",
                })
                .then(res => res.json())
                .then((data) => {
                   setComments(data)
                })
            
              } catch (error) {
                console.log(error);
            }
            }

        useEffect(()=>{
            fetchComment()
        },[])

console.log(comments);


  return (
    <>
    <div>
        <form onSubmit={handleCreateComment}>
        <label>Comment: </label>
        <input
        className='bg-gray-50 border border-gray-300 p-2'
        type="text"
        onChange={ (e) => setContent(e.target.value)}
        value={content}
        />
        <button 
        className='p-2'
        type="submit">
            Add
        </button>
        {comments ? comments.map((comment, idx) => 
        <div
        key={idx}
        >{comment}</div>) 
        : null}
        </form>

      

    </div>
    </>
  )
}
