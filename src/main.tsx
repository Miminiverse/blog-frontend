import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {UserContextProvider, UserOauthContextProvider} from './context/UserContext'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <UserContextProvider>
    <UserOauthContextProvider >
    <App />
    </UserOauthContextProvider>
</UserContextProvider>
  </React.StrictMode>,
)
