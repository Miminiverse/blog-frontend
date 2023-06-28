import React, { useEffect, useState, ChangeEvent} from 'react';
import { useParams } from 'react-router-dom';
import styles from '@asset/App.module.css'
import Input from '../forms/Input';
import axios from 'axios';


export default function AddGetTodos ({setTodos}) {
  const [values, setValues] = useState({
    title: "",
    content: "",
  })
  const [image, setImage] = useState()

  const [OAuthuser, setOauthUser] = useContext(UserOauthContext)


  function handleChange (e: ChangeEvent<HTMLInputElement>): void{
    setValues({
      ...values, 
      [e.target.name] : e.target.value})
}


  const handleUploadImage = (image) => {

    
    // if (image.type === "image/jpeg" || image.type === "image/png") {
    //   const data = new FormData()
    //   data.append("file", image)
    //   data.append("upload_preset", "deer-project")
    //   data.append("cloud_name", "dw9jbhowf")
    //   fetch("https://api.cloudinary.com/v1_1/dw9jbhowf", {
    //     method: "POST", 
    //     body: data
    //   })
    //   .then(res => res.json())
    //   .then(data => {
    //     setImage(data.url.toString())
    //   })
    //   .catch((err) => {
    //     console.log(err);
        
    //   })
    // } 
  }



const handleAdd = async (e: ChangeEvent<HTMLFormElement>) => {
  e.preventDefault()
  const url ="http://localhost:5051/api/v1/todos"
  const token: {token: string } | null = JSON.parse(localStorage.getItem("userToken") || "null")

  try {
    const { title, content } = values

    const {data} = await axios.post(url, 
      {
        title,
        content
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    setTodos(data.todo)
    

  } catch (error) {
    console.log(error);
}
}


return (
<>
<form 
       
        id="form" 
        onSubmit={handleAdd}
        >
            <div>
            Title
            <Input 
           onChange={handleChange} id="title" name="title" title="title" >
            </Input>
              </div>
              <div>
                Content
              <Input 
            onChange={handleChange}  id="content" name="content" title="content" >
            </Input>
            <form>
            <input 
            type="file"
            accept='image/*'
            onChange={(e) => handleUploadImage(e.target.files[0])}   >
            </input>
            </form>

              </div>

             <button 
             type="submit">
              Add
             </button> 

        </form>
</>
)
}

