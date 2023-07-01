import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AddOAuthTodos from "./AddOAuthTodos"
import Comments from "./Comments"
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom';

const GetOAuthTodo = () => {

    const {id} = useParams()
    const [otodo, setOTodo] = useState()

    useEffect(() =>{
        fetchOTodo()
    }, [])


    const fetchOTodo = async () => {
      const url =`http://localhost:5051/api/v1/oauth/todos/${id}`

      try {
    
        fetch(url, {
            method:"GET",
            credentials: "include",
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data)
            setOTodo(data.Otodo)
        })
      } catch (error) {
        console.log(error);
    }
  }



    return (
    <>
    {otodo && (
    <div className='bg-white'>
    <div
    key={otodo._id}
    className="p-2 max-w-lg bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-slate-300 items-center mx-auto my-6">
   
    <a href="#">
        <img className="rounded-t-lg" src={otodo.pic} alt="image" />
    </a>
    <div className="p-5">
  
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{otodo.title}</h5>

        <p className="mb-3 text-gray-900">{otodo.content}</p>
    
    </div>
    <Comments todo={otodo._id}/>
    </div>
</div>
    )}
    
    </>
    )
}

export default GetOAuthTodo


