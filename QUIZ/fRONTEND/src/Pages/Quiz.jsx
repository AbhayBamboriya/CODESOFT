'use client';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DeleteQuiz, StartQuiz } from '../../Redux/Slices/QuizSlice';
import { toast } from 'react-toastify';

function CalculateMarks(questions){
    let marks=0;
    // console.log('question  for calculate',questions);
    questions.map((q)=>{
        // console.log(q.Marks);
        marks+=q.Marks
    })
    // console.log('total marks',marks);
    return marks
}
const Quiz = ({createdBy,subject,id,userId,questions,check}) => {
  const location=useLocation()

  
  // console.log('location is ',location.pathname);
  const path=location.path
  const marks=  CalculateMarks(questions)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  async function Delete(){
    const res=await dispatch(DeleteQuiz(id))
    console.log('res from delete',res);
    if(res?.payload?.success){
      // navigate('/myQuiz')
      toast.success('Quiz Deleted Successfully',{
        autoClose:3000
      })
      window.location.reload();
      
    }
  }
  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };
  return (
    <div
    ref={divRef}
    onMouseMove={handleMouseMove}
    onFocus={handleFocus}
    onBlur={handleBlur}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    className=' mb-[30px] flex h-[10%] w-[26%] items-cnter justify-center overflow-hidden rounded-xl border border-gray-800  transform bg-wite bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)] px-8 py-16 shadow-2xl'
  >
    <div
      className='pointer-events-none absolute -inset-px opacity-0 transition duration-300'
      style={{
        opacity,
        background: `radial-gradient(100px circle at ${position.x}px ${position.y}px, rgba(255,182,255,.1), transparent 40%)`,
      }}
    />
    <div className='text-center flex flex-col gap-[15%] h-[40%] bg-blck'>
          <h1 className='text-white'>Quiz</h1>
          <span className='text-white'>Created By : {createdBy}</span>
          <h2 className='text-white'>Subject : {subject}</h2>
          <h2 className='text-white'>Total Marks : {marks}</h2>
          <Link to={`/quiz/${userId}/${id}/${check}`}>
           {((location.pathname=='/mypage' && localStorage.getItem('role')=='Student' ) || location.pathname=='/myQuiz' ) && <button
                      className="relative  inline-flex h-10 overflow-hidden rounded-full p-[1px] hover:outline-none hover:ring-2 hover:ring-gray-400 hover:ring-offset-2 hover:ring-offset-gray-50"
                      // className="bg-yellow-500 mt-2 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded-xl py-2 font-semibold text-lg cursor-pointer"
                      >
                       
                          <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
                                  <span className='inline-flex w-full h-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl hover:bg-gray-900'>
                          
                                  {location.pathname=='/myQuiz' ? 'See Info' :"Let's Start"}
                                  
                          </span>
                      </button>}

         
          </Link>
          {
            location.pathname==='/myQuiz' && <button
            className="relative  inline-flex h-10 overflow-hidden rounded-full p-[1px] hover:outline-none hover:ring-2 hover:ring-gray-400 hover:ring-offset-2 hover:ring-offset-gray-50"
            onClick={Delete}
            >
             
                <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]' />
                        <span className='inline-flex w-full h-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-8 py-1 text-sm font-medium text-gray-50 backdrop-blur-3xl hover:bg-gray-900'>
                
                        Delete Quiz
                        
                </span>
            </button>
          }
    </div>
    
  </div>
  );
}

export default Quiz;