import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import HomePage from './Layout/HomePage'
import Description from './Pages/Description'
import Internship from './Pages/Internship'
import Apply from './Compnents/Apply'
function App() {


  return (
    <>
        <Routes>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/:id' element={<Description/>}/>
          <Route path='/Internship' element={<Internship/>}/>
          <Route path= {`/apply/:id`} element={<Apply/>}/>
        </Routes>
    </>
  )
}

export default App
