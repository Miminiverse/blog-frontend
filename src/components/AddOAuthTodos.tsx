import React, { useEffect, useState, ChangeEvent, useContext} from 'react';
import { useParams } from 'react-router-dom';
import styles from '@asset/App.module.css'
import Input from '../forms/Input';
import axios from 'axios';
import {UserContext, UserOauthContext} from "../context/UserContext";

export default function AddOAuthTodos () {

  const [ovalues, setOValues] = useState({
    title: "",
    content: "",
  })

  const [OAuthuser, setOauthUser] = useContext(UserOauthContext)
    console.log(OAuthuser);
  

  function handleOChange (e: ChangeEvent<HTMLInputElement>): void{
    setOValues({
      ...ovalues, 
      [e.target.name] : e.target.value})
}

console.log(ovalues);




const handleAddOAuth = (e: ChangeEvent<HTMLFormElement>) => {
  e.preventDefault()
  console.log("add");

  
  const url ="http://localhost:5051/api/v1/oauth/todos"


  try {
    const { title, content } = ovalues

    fetch(url, {
        body: JSON.stringify({
            title,
            content
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
            
              </div>

             <button 
             type="submit">
              Add
             </button> 

        </form>
</>
)
}

