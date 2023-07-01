import React, { useEffect, useState, ChangeEvent, useContext} from 'react';
import { useParams } from 'react-router-dom';
import styles from '@asset/App.module.css'
import Input from '../forms/Input';
import axios from 'axios';
import {UserOauthContext} from "../context/UserContext";

export default function AddOAuthTodos ({onAddOAuthTodos}) {

  const [ovalues, setOValues] = useState({
    title: "",
    content: "",
  })
  const [pic, setPic] = useState("")

  const {userOauth, setUserOauth}= useContext(UserOauthContext)

  

  function handleOChange (e: ChangeEvent<HTMLInputElement>): void{
    setOValues({
      ...ovalues, 
      [e.target.name] : e.target.value})
}


const handleAddOAuth = (e: ChangeEvent<HTMLFormElement>) => {
  e.preventDefault()

  const url ="http://localhost:5051/api/v1/oauth/todos"

  try {
    const { title, content } = ovalues

    fetch(url, {
        body: JSON.stringify({
            title,
            content,
            pic
        }),
        method:"POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => {
      alert("Blog added successfully")
      onAddOAuthTodos(data.Otodo)
      setOValues({
        title: "",
        content: "",
      })

      
    })

  } catch (error) {
    console.log(error);
}
}





const handleUploadImage = async (image) => {
  
    
    if (image.type === "image/jpeg" || image.type === "image/png") {
      const data = new FormData()
      data.append("file", image)
      data.append("upload_preset", "deer-project")
      data.append("cloud_name", "dw9jbhowf")


      await fetch("https://api.cloudinary.com/v1_1/dw9jbhowf/image/upload", {
        method: "POST", 
        body: data,
      })
      .then(res => res.json())
      .then(data => {
        setPic(data.url.toString())
        alert("Image upload successfully")
      })
      .catch((err) => {
        console.log(err);
        
      })
    } 
  }
return (
<>
        <div className="p-2 m-4 max-w-sm border rounded-lg shadow bg-white dark:border-gray-700 text-black items-center mx-auto">
        <form 
       
        id="form" 
        onSubmit={handleAddOAuth}
        >
            <div>
            Title
            <input 
           onChange={handleOChange} id="title" name="title" title="title" 
           value={ovalues.title}
           className='bg-slate-200 w-full p-2 rounded-lg text-black outline-none'/>
           </div>
            <div>
                Content
            <input 
           value={ovalues.content}
            
            onChange={handleOChange}  id="content" name="content" title="content" 
            className='bg-slate-200 w-full p-2 rounded-lg text-black outline-none'/>
            

            <input 
            type="file"
            accept='image/*'
            onChange={(e) => handleUploadImage(e.target.files[0])}  
            className="m-2"
            />
     
              </div>

             <button 
             className="m-2 items-center px-3 py-2 text-sm font-medium text-center  text-black rounded-lg bg-slate-50"
             type="submit">
              Add
             </button> 

        </form>
        </div>
</>
)
}

