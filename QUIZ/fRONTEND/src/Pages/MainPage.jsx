import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { AllQuiz } from '../../Redux/Slices/QuizSlice';
import Quiz from './Quiz';

const MainPage = () => {
    const dispatch = useDispatch();
    const allQuiz = useSelector((state) => state?.quiz?.AllQuiz || []);

    // console.log('all quiz', allQuiz);
    // console.log('allQuiz type:', typeof allQuiz);
    // console.log('isArray:', Array.isArray(allQuiz));

    async function GetAllQuiz() {
        const res = await dispatch(AllQuiz());
        console.log('res is ', res);
    }

    useEffect(() => {
        GetAllQuiz();
    }, []);

    return (
        <div className='h-fit-content'>
            <Navbar />
            <div className='bg-gradient-to-b from-[#0c0c1d]  to-[#070746] flex justify-center h-fit-content'>
            <div className='w-[80%] flex  justify-center flex-wrap gap-[5%] sm:flex-cl  h-[500vh] max-h-fll bg-blak mb-[3%]  overflow-y-auto '>
                {Array.isArray(allQuiz) && allQuiz.length > 0 && allQuiz.map((d) => {
                    console.log('in map',(d));
                    return(
                        Array.isArray(d.Quiz) && d.Quiz.length>0 && d.Quiz.map((q)=>{
                            console.log('abha is',q);
                            return <Quiz key={q.id} createdBy={q.CreatedBy} userId={d.userId} subject={q.Subject} id={q._id} questions={q.Questions} check={false} />
                            
                        })
                    )
                })}
            </div>
            </div>
        </div>
    );
};

export default MainPage;
