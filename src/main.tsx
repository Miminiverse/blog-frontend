import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {UserContextProvider, UserOauthContextProvider} from './context/UserContext'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

     <UserContextProvider>
    <UserOauthContextProvider >
    <App />
    </UserOauthContextProvider>
</UserContextProvider>

)
