import React from 'react'

import { Navigate } from 'react-router-dom'
const isLogged = ({children}) => {
    const token = localStorage.getItem("token")
    if(!token){
        return <Navigate to={"/login"} replace/>
    }
    return children
  return (
    <div>AdminRoutes</div>
  )
}

export default isLogged