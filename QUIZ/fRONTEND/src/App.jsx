import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import MainPage from './Pages/MainPage'
import QuizList from './Pages/QuizList'
import Result from './Pages/Result'
import CreateQuiz from './Pages/CreateQuiz'
import MyQuiz from './Pages/MyQuiz'
// import { Result } from 'postcss'

function App() {
  let check=false || true
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/mainpage' element={<MainPage/>}/>
        <Route path={`/quiz/:userId/:QuizId/:check`} element={<QuizList/>}/>
        <Route path='/createQuiz' element={<CreateQuiz/>}/>
        <Route path='/result/:marks/:userId/:totalMarks/:QuizId' element={<Result/>}/>
        <Route path='/myQuiz' element={<MyQuiz/>}/>
      </Routes>
    </>
  )
}






export default App