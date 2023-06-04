import React, { useEffect, useState, ChangeEvent, useContext} from 'react';
import { useParams } from 'react-router-dom';
import styles from '@asset/App.module.css'
import Input from '../forms/Input';
import axios from 'axios';
import {UserOauthContext} from "../context/UserContext";

export default function AddOAuthTodos () {

  const [ovalues, setOValues] = useState({
    title: "",
    content: "",
  })
  const [pic, setPic] = useState()

  const {userOauth, setUserOauth}= useContext(UserOauthContext)

  

  function handleOChange (e: ChangeEvent<HTMLInputElement>): void{
    setOValues({
      ...ovalues, 
      [e.target.name] : e.target.value})
}





const handleAddOAuth = (e: ChangeEvent<HTMLFormElement>) => {
  e.preventDefault()
  console.log("add");
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


  } catch (error) {
    console.log(error);
}
}




const handleUploadImage = async (image) => {
    console.log(image);
    
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
        // console.log(data.url.toString());
        
      })
      .catch((err) => {
        console.log(err);
        
      })
    } 
  }
return (
<>
<form 
       
        id="form" 
        onSubmit={handleAddOAuth}
        >
            <div>
            Title
            <Input 
           onChange={handleOChange} id="title" name="title" title="title" >
            </Input>
      
              </div>
              <div>
                Content
              <Input 
            
            onChange={handleOChange}  id="content" name="content" title="content" >
            </Input>

            <input 
            type="file"
            accept='image/*'
            onChange={(e) => handleUploadImage(e.target.files[0])}  />
    
              </div>

             <button 
             type="submit">
              Add
             </button> 

        </form>
</>
)
}

