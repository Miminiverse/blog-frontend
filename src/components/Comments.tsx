
import React, {useEffect, useState, useContext, useRef} from 'react';
import axios from 'axios';
import {UserOauthContext} from "../context/UserContext";
import { io, Socket } from 'socket.io-client';
import SingleComment from "./SingleComment"
import ReplyComment from "./ReplyComment"
import { v4 as uuidv4 } from "uuid";

export default function Comments({todo}) {




    const {userOauth, setUserOauth, comments, setComments}= useContext(UserOauthContext)
    const [content, setContent] = useState<string>("")

    // const [comments, setComments] = useState()
    const [arrivalComments, setArrivalComments] = useState<null>(null)

    const socket = useRef()

console.log(content)

    
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
                    todoId: todo,
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
                console.log({"addCommemt": data})
                setComments(prev => [...prev, data.comments])
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
                            todoId: todo,
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
                    console.log({"fetchComment": data})
                   setComments(data.comments)
                })
            
              } catch (error) {
                console.log(error);
            }
            }

        useEffect(()=>{
            fetchComment()
        },[])


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
        className='p-2 rounded-lg border text-black border-gray-300 m-2'
        type="submit">
            Add
        </button>
        </form>
        </div>

        {comments ? comments.map((comment:any) => 
        (!comment.parentId && 
        (<div>
          
        <SingleComment comment={comment} key={comment._id} todo={todo}/>
        {comment._id && <ReplyComment todo={todo} key={uuidv4()} parentCommentId={comment._id}/>}
        </div>)
        )
        )
        : null}
    </div>
    </>
  )
}
