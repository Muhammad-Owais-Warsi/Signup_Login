import { useState } from 'react'
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'

function App() {

  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path='Signup' element={<Signup/>} />
        <Route path='Login' element={<Login/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
