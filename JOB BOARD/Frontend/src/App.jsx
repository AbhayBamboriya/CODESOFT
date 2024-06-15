import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import HomePage from './Layout/HomePage'
function App() {


  return (
    <>
        <Routes>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/' element={<HomePage/>}/>
        </Routes>
    </>
  )
}

export default App
