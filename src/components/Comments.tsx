
import React, {useEffect, useState, useContext, useRef} from 'react';
import axios from 'axios';
import {UserOauthContext} from "../context/UserContext";
import { io, Socket } from 'socket.io-client';
import MyComment from "./MyComment"
import SingleComment from "./SingleComment"
import ReplyComment from "./ReplyComment"

export default function Comments({todo}) {

    const {userOauth, setUserOauth, comments, setComments}= useContext(UserOauthContext)
    const [content, setContent] = useState<string>("")

    // const [comments, setComments] = useState()
    const [arrivalComments, setArrivalComments] = useState<null>(null)

    const socket = useRef()

    console.log(userOauth)

    
    // useEffect(() => {
    //     if(userOauth) {
    //         socket.current = io("http://localhost:5051")
    //         socket.current.emit("online-user", userOauth?._doc.username, userOauth?._doc._id)
    //     }
    // }, [userOauth])

    

    const handleCreateComment = (e) => {
        e.preventDefault()
        
        const url = `http://localhost:5051/api/v1/oauth/todos/comment/create`
        try {
            fetch(url, 
                {
                body: JSON.stringify({
                    content: content,
                    username: userOauth._doc._id,
                    todoId: todo._id,
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
                console.log(data)
                // setComments(data.comments)
               setContent("")
            })

          } catch (error) {
            console.log(error);
        }
        }

        const fetchComment = () => {
            
            const url = `http://localhost:5051/api/v1/oauth/todos/comment/getComments`
            try {
            
                fetch(url, 
                    {
                        body: JSON.stringify({
                            todoId: todo._id,
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
                    
                   setComments(data.comments)
                })
            
              } catch (error) {
                console.log(error);
            }
            }

        useEffect(()=>{
            fetchComment()
        },[])
console.log(comments)

  return (
    <>
    <div>
        <div className="flex m-auto items-center justify-center">
        <form onSubmit={handleCreateComment}>
        <input
        className='bg-gray-50 border border-gray-300 p-2 rounded-lg'
        type="text"
        onChange={ (e) => setContent(e.target.value)}
        value={content}
        placeholder='Write your comment'
        />
        <button 
        className='p-2 rounded-lg border text-white border-gray-300 m-2'
        type="submit">
            Add
        </button>
        </form>
        </div>

        {comments ? comments.map((comment) => 
        (!comment.parentId && 
        <>
          
        <SingleComment comment={comment} key={comment._id} todo={todo}/>
        <ReplyComment todo={todo} parentCommentId={comment._id}/>
        </>
        )
        )
        : null}
    </div>
    </>
  )
}
