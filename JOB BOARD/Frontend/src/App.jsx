import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import HomePage from './Layout/HomePage'
import Description from './Pages/Description'
import Internship from './Pages/Internship'
import Apply from './Compnents/Apply'
import MyApplication from './Pages/MyApplication'
import Jobs from './Pages/Jobs'
import Applicants from './Pages/Applicants'
import Post from './Pages/Post'
import RequireAuth from './Compnents/Auth/RequireAuth'
import NotFound from './Pages/NotFound'
function App() {


  return (
    <>
        <Routes>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/:id' element={<Description/>}/>
          <Route path='/Internship' element={<Internship/>}/>
          <Route path='/Job' element={<Internship/>}/>
          <Route path= {`/apply/:id`} element={<Apply/>}/>
          <Route path='/application' element={<MyApplication/>}/>
          
          <Route path='/list' element={<Jobs/>}/>

          <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
            <Route path='/applicants' element={<Applicants/>}/>
            <Route path='/post' element={<Post/>}/>
          </Route>
          <Route path='*' element={<NotFound/>}></Route>
        </Routes>
    </>
  )
}

export default App
