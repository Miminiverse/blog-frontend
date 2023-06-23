
import React, {useEffect, useState, useContext, useRef} from 'react';
import axios from 'axios';
import {UserOauthContext} from "../context/UserContext";
import { io, Socket } from 'socket.io-client';
import SingleComment from './SingleComment';
import ReplyComment from "./ReplyComment"

export default function ReplyComment({todo, parentCommentId}) {

    const {userOauth, setUserOauth, comments, setComments}= useContext(UserOauthContext)
    const [showReplies, setShowReplies] = useState(false)

    const handleShowReplies = () => {
        setShowReplies(!showReplies)
    }

    console.log(comments)

     return (
        <>
        <div>
            <button onClick={handleShowReplies}
            className='text-white rounded-sm'
            >Show replies
            </button>

            {showReplies && (
            comments ? comments.map((comment) => (
                <div>
                {comment.parentId === parentCommentId &&
                <div key={comment.parentId} className="ml-6">
                <SingleComment comment={comment} key={comment._id} todo={todo}/>
                <ReplyComment todo={todo} parentCommentId={comment._id}/>

                </div>
                }
                </div>
            )): null
            )
            }
           
  
           
        </div>

        
        </>
    )
}
