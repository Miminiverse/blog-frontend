
import React, {useEffect, useState, useContext, useRef} from 'react';
import axios from 'axios';
import {UserOauthContext} from "../context/UserContext";
import { io, Socket } from 'socket.io-client';
import SingleComment from './SingleComment';
import ReplyComment from "./ReplyComment"
import { PiArrowBendDownRightLight } from "react-icons/pi";
import { v4 as uuidv4 } from "uuid";


export default function ReplyComment({todo, parentCommentId, fetchComment}) {

    const {userOauth, setUserOauth, comments, setComments}= useContext(UserOauthContext)
    const [showReplies, setShowReplies] = useState(false)
    const [commentNumber, setCommentNumber] = useState<number>()


    const handleShowReplies = () => {
        setShowReplies(!showReplies)
    }

    useEffect(() => {
        let commentNum = 0
        if (comments && parentCommentId) {
            comments.map((comment) => {
                if (comment.parentId === parentCommentId) {
                    commentNum ++
                }
            })
        }
        setCommentNumber(commentNum)
    }, [comments])

     return (
        <>
        <div>
            {commentNumber ? commentNumber > 0 && (
                <div className='flex flex-row'>
                  <div className='h-4 w-4 pt-2'>
                  <PiArrowBendDownRightLight />
                      </div>
                <button onClick={handleShowReplies}
                className='text-black rounded-sm text-sm m-2'
                >
                    {commentNumber === 1 ? `Show ${commentNumber} more comment` : `Show ${commentNumber} more comments`}
                </button>
                </div>
        
            ): null}
     

            {showReplies && (
            comments ? comments.map((comment:any) => (
                <div key={comment._id}>
                {comment?.parentId === parentCommentId &&
                <div  className="ml-8 border-l-2">
                <SingleComment comment={comment}  todo={todo} fetchComment={fetchComment} />
                <ReplyComment todo={todo} parentCommentId={comment._id} fetchComment={fetchComment}/>

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
