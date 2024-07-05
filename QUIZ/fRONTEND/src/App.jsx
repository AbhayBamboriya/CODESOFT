import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import MainPage from './Pages/MainPage'
import QuizList from './Pages/QuizList'
import Result from './Pages/Result'
// import { Result } from 'postcss'

function App() {

  return (
    <>
      <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/mainpage' element={<MainPage/>}/>
      <Route path='/quiz/:userId/:QuizId' element={<QuizList/>}/>
      <Route path='/result/:marks/:userId/:totalMarks/:QuizId/:option' element={<Result/>}/>
      {/* /result/${marks}/${userId} */}
      </Routes>
    </>
  )
}






export default App