import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AddOAuthTodos from "./AddOAuthTodos"
import Comments from "./Comments"
import {Link} from 'react-router-dom'

const GetOAuthTodos = () => {
    const [otodos, setOTodos] = useState([])

    useEffect(() =>{
        fetchOTodos()
    }, [])


    const fetchOTodos = async () => {
      const url ="http://localhost:5051/api/v1/oauth/todos"

      try {
    
        fetch(url, {
            method:"GET",
            credentials: "include",
        })
        .then(res => res.json())
        .then((data) => {

            const oTodos = data.Otodos
            setOTodos(oTodos)
        })
      } catch (error) {
        console.log(error);
    }
  }

  console.log(otodos);
  

  const getOTodo = (item) => {
    window.location.href("/otodo")
  }

  const onAddOAuthTodos = (Otodos) => {
    setOTodos(prev => [Otodos, ...prev])
  }


    return (
    <>
        <div className='bg-white'>
        <AddOAuthTodos  onAddOAuthTodos={onAddOAuthTodos}/>
            {otodos ? otodos.map((item) => {
            return (
           
                <div
   
                key={item._id}
                className="p-2 max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-slate-300 items-center mx-auto my-6">
               
                <a href="#">
                    <img className="rounded-t-lg" src={item.pic} alt="image" />
                </a>
                <div className="p-5">
                <Link  to={'/oauth/' + item._id}>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{item.title}</h5>
                </Link>
                    <p className="mb-3 text-gray-900">{item.content}</p>
                   
                </div>
                {/* <Comments todo={item._id}/> */}
                </div>
  
                
                // <div className="p-4" 
                // key={item.title}>
                //     <p>Title: {item.title}</p>
                //     <img src={item.pic} alt="image" width="100px"/> 
                //     <Comment todo={item}/>
                // </div>
            )
            }
            ): null}
        <div>
    
        </div>
        <header>
        <div >


        </div>

        </header>
        </div>



    </>
    )
}

export default GetOAuthTodos


