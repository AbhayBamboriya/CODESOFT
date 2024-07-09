import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import MainPage from './Pages/MainPage'
import QuizList from './Pages/QuizList'
import Result from './Pages/Result'
import CreateQuiz from './Pages/CreateQuiz'
import MyQuiz from './Pages/MyQuiz'
import NotFound from './Pages/NotFund'
import RequireAuth from './Pages/Components/Auth'
import AddQuestion from './Pages/AddQuestion'
// import { Result } from 'postcss'

function App() {
  let check=false || true
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
    
        
     
        

        <Route element={<RequireAuth allowedRoles={["Student"]}/>}>
            <Route path='/result/:marks/:userId/:totalMarks/:QuizId' element={<Result/>}/>
            
        </Route>

        <Route element={<RequireAuth allowedRoles={["Student","Teacher"]}/>}>
              <Route path='/mainpage' element={<MainPage/>}/>
              <Route path={`/quiz/:userId/:QuizId/:check`} element={<QuizList/>}/>
        </Route>

        <Route element={<RequireAuth allowedRoles={["Teacher"]}/>}>
            <Route path='/myQuiz' element={<MyQuiz/>}/>
            <Route path='/createQuiz' element={<CreateQuiz/>}/>
            <Route path='/format/:QuizId' element={<AddQuestion/>}/>
        </Route>

        {/* <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]} />}>
                <Route path='/user/profile' element={<Profile/>}/>
                <Route path='/user/editprofile' element={<EditProfile/>}/>
                <Route path='/course/displaylecture' element={<DisplayLecture/>}/>
 */}

        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </>
  )
}






export default App