import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AddOAuthTodos from "./AddOAuthTodos"

const GetOAuthTodos = () => {




//     const fetchTodos = async () => {
//       const url ="http://localhost:5051/api/v1/todos"
//       const token: {token: string } | null = JSON.parse(localStorage.getItem("userToken") || "null")

//       try {

//         const {data} = await axios.get(url, 
//         {
//           headers: {     
//             Authorization: `Bearer ${token}`, },
//         }
//         )
//         setTodos(data.todos)
  
//       } catch (error) {
//         console.log(error);
//     }
//   }


  

    return (
    <>
           <div>
        <div  >
        </div>
        <header>
        <div >
        <AddOAuthTodos  />

        </div>

        </header>

        <main>


        </main>
        </div>



    </>
    )
}

export default GetOAuthTodos


