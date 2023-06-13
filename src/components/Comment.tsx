
import React, {useEffect, useState, useContext, useRef} from 'react';
import axios from 'axios';
import {UserOauthContext} from "../context/UserContext";
import { io, Socket } from 'socket.io-client';

export default function Comment({todo}) {

    const {userOauth, setUserOauth}= useContext(UserOauthContext)
    const [content, setContent] = useState<string>("")
    const [comments, setComments] = useState()
    const [arrivalComments, setArrivalComments] = useState<null>(null)
    const socket = useRef()
    
    useEffect(() => {
        if(userOauth) {
            socket.current = io("http://localhost:5051")
            socket.current.emit("online-user", userOauth?._doc.username, userOauth?._doc._id)
        }
    }, [userOauth])
    

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
                // setComments(prev => [...prev, {
                //     username: userOauth?._doc.username,
                //     content: content, 
                // }])
               setContent("")
            })

            socket.current.emit("create-comment", {
                content: content,
                username: userOauth?._doc.username,
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

        useEffect(() => {
            if (socket.current) {
                socket.current.on("broadcast-comment", (data) => {
                    console.log(data);
                    setArrivalComments({
                        content: data.content,
                        username: data.username,
                    })
                })
            }
        }, [])
        
        useEffect(() => {
            arrivalComments && setComments((prev) => [...prev, arrivalComments])
        }, [arrivalComments])

  return (
    <>
    <div>
        <form onSubmit={handleCreateComment}>
        <div className="m-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Comment
        </div>
        <input
        className='bg-gray-50 border border-gray-300 p-2 rounded-lg'
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
        className='m-2 px-3 py-2 rounded-lg bg-slate-50'
        key={idx}
        >
            <div className="w-1/3 m-2 items-left text-sm font-semibold text-gray-600">
                {comment.username}
            </div>
            <div className="w-2/3 m-2 text-sm font-mono">
                {comment.content}
            </div>
        </div>) 
        : null}
        </form>

      

    </div>
    </>
  )
}
