import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { My_Quiz } from '../../Redux/Slices/QuizSlice'
import { BsCollection, BsCollectionPlayFill, BsTrash } from "react-icons/bs"
import Quiz from './Quiz'
import { useNavigate } from 'react-router-dom'
const MyQuiz = () => {
    const [output, setOutput] = useState([])
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const userId=useSelector(state=>state?.auth?.UserId)
    console.log('useeeeeerrrrrrrrrrrr id',userId);
    async function myQuiz() {
        const res = await dispatch(My_Quiz())
        console.log('res in myQuiz', res)
        setOutput(res?.payload?.Quiz)

        console.log('oin',output);
    }

    useEffect(() => {
        myQuiz()
    }, [])

    useEffect(() => {
        console.log('after changes', output)
    }, [output])

    return (
        <div className="bg-blue-500 h-[100vh] bg-cover bg-center  items-center justify-cente overflow-y-auto">
            {/* Render your output here */}
            <h1 className='text-center text-6xl mb-[5%]'>My Quiz</h1>

            <div className=' flex flex-wrap gap-[5%] h- relative justify-center '>
            {
                output && output.map((q)=>{
                    return <Quiz key={q._id} id={q._id} questions={q.Questions} userId={userId}  createdBy={q.CreatedBy} subject={q.Subject} check={true} />
                })
            }
            </div>
            <div className='w-full text-center'>
            <button onClick={()=>navigate('/mainpage')} className='text-center w-ful bgblack p-4 bg-emerald-500 hover:bg-emerald-600 rounded-xl' >Go Back</button>

            </div>
            
        </div>
    )
}

export default MyQuiz
