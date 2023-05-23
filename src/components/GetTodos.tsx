import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AddGetTodos from "./AddGetTodos"

const GetTodos = () => {
    const [todos, setTodos] = useState([])
    
    useEffect(() => {
        fetchTodos()
    }, [])



    const fetchTodos = async () => {
      const url ="http://localhost:5051/api/v1/todos"
      const token: {token: string } | null = JSON.parse(localStorage.getItem("userToken") || "null")

      try {

        const {data} = await axios.get(url, 
        {
          headers: {     
            Authorization: `Bearer ${token}`, },
        }
        )
        setTodos(data.todos)
  
      } catch (error) {
        console.log(error);
    }
  }


  

    return (
    <>
           <div>
        <div  >
        </div>
        <header>
        <div >
        <AddGetTodos  setTodos={setTodos} />

        </div>

        </header>

        <main>
          <div>
                <h2>Task</h2>
                { todos ? todos.map((todo) => (
            <div key={todo._id} >
            <div > 
                <span  >{todo.title} </span>
            </div>
          </div>
            )) : null }
          </div>

        </main>
        </div>



    </>
    )
}

export default GetTodos


