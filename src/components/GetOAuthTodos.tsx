import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AddOAuthTodos from "./AddOAuthTodos"
import Comment from "./Comment"

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



    return (
    <>
        <div>
            {otodos ? otodos.map((item) => {
            return (
                <div className="p-4" 
                key={item.title}>
                    <p>Title: {item.title}</p>
                    <img src={item.pic} alt="image" width="100px"/> 
                    <Comment todo={item}/>
                </div>
            )
            }


            
            ): null}
        <div>
    
        </div>
        <header>
        <div >
        <AddOAuthTodos  />

        </div>

        </header>
        </div>



    </>
    )
}

export default GetOAuthTodos


