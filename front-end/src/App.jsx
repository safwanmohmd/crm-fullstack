import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import IsLogged from './protectedRoutes/isLogged'
import Register from './pages/Register'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<IsLogged> <Home/> </IsLogged>} />
        <Route path='/login' element={ <Login/>} />
        <Route path='/register' element={ <Register/>} />
      </Routes>
    </div>
  )
}

export default App