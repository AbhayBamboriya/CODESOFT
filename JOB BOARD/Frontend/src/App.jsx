import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
function App() {


  return (
    <>
        <Routes>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
    </>
  )
}

export default App
