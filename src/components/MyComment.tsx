
import React, {useEffect, useState, useContext, useRef} from 'react';
import axios from 'axios';
import {UserOauthContext} from "../context/UserContext";
import { io, Socket } from 'socket.io-client';
import Reply from "./Reply"

export default function MyComment({comment}) {
    console.log(comment)
    const [showReply, setShowReply] = useState(false)
    const [reply, setReply] = useState<string>("")

    const handleShowReply = () => {
        setShowReply((prev) => !prev)
    }

    const handleSendReply = (e) => {
        e.preventDefault()
        
        const url = `http://localhost:5051/api/v1/oauth/todos/comment/${comment._id}/reply`
        try {
            fetch(url, 
                {
                body: JSON.stringify({
                    reply
                }),
                method:"POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                setReply("")
            })

          
          } catch (error) {
            console.log(error);
        }
        }
    return (
        <>
        {comment ? (
              <div
              className='m-2 px-3 py-2 rounded-lg bg-slate-50'
              key={comment._id}
              >
                  <div 
                  className="w-1/3 m-2 items-left text-sm font-semibold text-gray-600">
                      {comment.username} 
                  </div>
                  <div className="w-2/3 m-2 text-sm font-mono">
                      {comment.content ? comment.content : comment.reply}
                  </div>
      
                  <div className="m-2 border-solid border-red-300">
      
                  <button  
                  onClick={handleShowReply}
                  type="button"
                  className="text-sm"
                  >
                      Reply
                  </button>
      
                  {showReply ?  (
                      <form 
                      onSubmit={handleSendReply}>
                      <input
                      className='bg-gray-50 border border-gray-300 p-2 rounded-lg'
                      type="text"
                      placeholder="Type Reply"
                      onChange={(e) => setReply(e.target.value)}
                      value={reply}
                      />
                      <button type="submit">Send</button>
                      </form>
                  ): null}
                  
                  </div>
      
                      {comment && comment.replies ? comment.replies.map((reply)=>
                      {return (
      
                          <MyComment comment={reply} key={reply._id} />
          
                      )}): null}
      
      
              </div>
        ) : null}
      
        
        </>
    )
}
