import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import img from '../assets/bg.jpg';
import { StartQuiz } from '../../Redux/Slices/QuizSlice';
import { useDispatch } from 'react-redux';

const Result = () => {
    const { marks, totalMarks,check } = useParams();
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const [question, setQuestion] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userId, QuizId } = useParams();
    console.log('value of check',check);
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await dispatch(StartQuiz({ QuizId, userId }));
                setQuestion(response.payload.Question);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };
        fetchQuiz();
    }, [dispatch, QuizId, userId]);

    return (
        <div className='min-screen bg-red-400 flex flex-col items-center justify-cnter h-[100vh] ga-[10%] overflow-y-scroll' style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover' }}>
            <h1 className='text-7xl text-center z-10'>Congratulations for Result</h1>
            <h1 className='text-4xl -4'>Marks Scored: {marks}</h1>
                <h1 className='text-4xl mb-4'>Out Of: {totalMarks}</h1>
            <div className='flex flex-col items-center justify-center bg-wite min-h-screen w-full h-screen overflowy-scroll'>
                
                {question && question.length > 0 && question.map((q, index) => (
                    <div key={index} className="flex items-center justify-center my-4 w-full">
                        <div className="bg-gray-200 w-full md:w-1/2 lg:w-1/3 p-4 rounded-lg">
                            <h3 className="text-3xl font-bold mb-2 text-center">{q.Question}</h3>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='bg-gray-100 p-2 text-center'>
                                    Correct Answer: {q.CorrectAns}
                                </div>
                                {/* Add more details or options here */}
                               
                            </div>
                        </div>
                    </div>

                ))}
                 <button className='hover:text-emerald-400 p-4 bg-blue-800 rounded-2xl' onClick={()=>navigate('/mainpage')}>Go To Main Page</button>
            </div>
        </div>
    );
}

export default Result;