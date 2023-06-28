import React from 'react'
import { useEffect, useState } from 'react'

export default function GetCommentTemp() {
    const [comment, setComment] = useState([])
    // this is a mapping of parent comment ID to child comments (array)
    const [childComment, setChildComment] = useState({})

    const fetchTempComment = () => {
            
    const url = `http://localhost:5051/api/v1/oauth/todos/comment/getCommentTemp`
        try {
        
            fetch(url, 
                {
                method:"GET",
                credentials: "include",
            })
            .then(res => res.json())
            .then((data) => {

                setComment(data)
            })
        
          } catch (error) {
            console.log(error);
        }
        }

    useEffect(()=>{
        fetchTempComment()
    },[])


    const fetchChildrenComment = (id) => {
            
        const url = `http://localhost:5051/api/v1/oauth/todos/comment/getCommentTemp/${id}`
        try {
        
            fetch(url, 
                {
                method:"GET",
                credentials: "include",
            })
            .then(res => res.json())
            .then((data) => {
                const newChildComment = data.reduce((map, comment)=> {
                    if (!map[comment.parentComment]) {
                        // first time visit the new ParentID
                        // map.3 is undefined but we want to be an array comments
                        map[comment.parentComment] = [comment]
                        return map
                    } else {
                        map[comment.parentComment].push(comment)
                        return map
                    }
                }, {}) // empty object is the inital value for map
               setChildComment({
                ...childComment
               })
            })
        
          } catch (error) {
            console.log(error);
        }
        }



  return (
    <div>GetCommentTemp</div>
  )
}




{/* <button onClick={lookupChildren} />
<button>Show Replies</button>
{ commentReplies[comment.id] ? <RenderChildren /> : <RenderButton /> }
If there are no replies to look up in the first place, render null
(1) if the replies are already loaded (because the button was clicked, you can render them
(2) if there are replies that we expect we can get because `.hasReplies` is set, then you can render a button, and when the button is clicked, we call the backend
(3) if there are not children, and we don’t expect there to be any, render null; there will be no button to fetch them, because there’s nothing to fetch
When you render the children, use recursion
Return <Comment comment={replyComment} />
Return (indentation) + <Comment commentId={reply} /> */}