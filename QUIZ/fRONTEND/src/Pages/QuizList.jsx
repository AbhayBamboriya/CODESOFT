import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate, useParams } from 'react-router-dom';
import { StartQuiz } from '../../Redux/Slices/QuizSlice';

import './style.css'



const QuizList = () => {
    const navigate=useNavigate()
    const [option,setOption]=useState([])
    const { userId, QuizId } = useParams();
    const [question, setQuestion] = useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true); 
    const [isClicked, setIsClicked] = useState(false);
    const [marks,setMarks]=useState(-1)
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeOption,setActiveOption]=useState({ id: null, opid: null })
    let totalMarks = 0
    function Submit(){
        setMarks(0)
        console.log('option finally',option,marks);
        let MarksScored=0;
        for(let i=0;i<option.length;i++){
            console.log('before marks',marks);
            console.log(option[i].correctAns);
            // totalMarks+=option[i].Marks
            if(option[i].correctAns==option[i].choosenOption){
                MarksScored += option[i].Marks;
            }
            console.log('afer marks',marks);

        }

        setMarks((prevMarks) => prevMarks + MarksScored);
        console.log('marks after',marks);
        // useEffect to navigate after marks state is updated
        
        if(marks!=-1) {
            navigate(`/result/${marks}/${userId}/${totalMarks}/${QuizId}/${option}`)
            setActiveOption()
            setOption([])
            setQuestion([]);
            setLoading(true); 
            setIsClicked(false);
            setMarks(-1)
            setCurrentSlide(0);
            setActiveOption({ id: null, opid: null })
        }
    }
    function OptionClicked(id,optionChoosen,opid,correctAns,Marks){
        setActiveOption((prev) => ({
            ...prev,
            id: id,
            opid: opid
        }));
        
        // console.log('active optio  is ',activeOption);
        setIsClicked(!isClicked);
        // console.log('id in',opid,optionChoosen.o,correctAns);
       
       
        // console.log('marks after',marks);
        console.log('option before',option,'id from question',id);
        const obj={
            correctAns:correctAns,
            choosenOption:optionChoosen.o,
            opid:opid,
            id:id,
            Marks:Marks
        }
        console.log('obect ',obj,id);
        if (option.some(item => item.id === id)) {
            // If id exists, update the state with the new object replacing the old one
            // console.log('prev is',prev);
            setOption(prev => prev.map(item => (item.id === id ? obj : item)));
            // setOption(prev => {
            //     const updatedOptions = [...prev];
            //     updatedOptions[existingIndex] = obj;
            //     return updatedOptions;
            // });
        } else {
            // If id doesn't exist, add the new object to the state
            setOption(prev => [...prev, obj]);
        }
        

        // console.log('option after',option);
    }

    useEffect(() => {
        const fetchQuiz = async () => {
            

            try {
                const response = await dispatch(StartQuiz({ QuizId, userId }));
                setQuestion(response.payload.Question);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };
        fetchQuiz();
    }, [dispatch, QuizId, userId]);

    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite:false,
        afterChange: (index) => setCurrentSlide(index)
    };
    // console.log('question is',question);
    if (loading) {
        return <div>Loading...</div>; // Render loading indicator until data is fetched
    }

    return (
        <div
            className="text-black bg-[url('https://images.pexels.com/photos/7130545/pexels-photo-7130545.jpeg?auto=compress&cs=tinysrgb&w=600')]  bg-cover bg-center h-screen flex flex-col items-center justify-center"
            
            >
            
            <Slider {...settings} className="w-[80%] h-[80%] bg-rd-800 flex items-center justify-center">
                {/* <h1 className='display-none'>ASS</h1> */}
                {question && question.length>0 && question.map((q, index) => (
                    
                    <div key={index} className="flex items-center h-full justify-center bg-back">
                        {/* {console.log('quetion le',q)} */}
                        <div className="text-center h-full bg-rd-400 flex flex-col gap-[50px]">
                           <div className='flex flex-col  items-center  gap- w-full bg-back  justify-around'>
                            <h3 className="text-3xl font-bold mb-2 text-center bg-re-400 w-full flex justify-center gap-[2%]">
                                <span>{currentSlide+1}).</span>
                                <span>{q.Question}</span>
                                {/* <p className="text-lg pl-[130px]">Marks: {q.Marks}</p>   */}
                            </h3>
                            <div className='grid w-full  justify-items-stretch '>
                                <div className="text-lg pl-[130px] justify-self-end mr-[5%]">
                                    <div className='hidden'>
                                    {
                                     totalMarks=totalMarks+q.Marks
                                    }
                                    </div>
                                    Marks: {q.Marks}</div>
                            </div>
                            </div>

                            <div className='flex flex-col gap-[20px] items-center text-center'>
                            {q.Options && 
                                q.Options.map((o,id)=>{
                                    // console.log('qqq',q);
                                    let p;
                                    // console.log('option abhay',option);
                                    for(let k=0;k<option.length;k++){
                                        console.log('clickde',q,option[k],'id',q._id);
                                        if(option[k].id==q._id){
                                            p=option[k].opid
                                            break
                                        }
                                    }
                                    // {console.log(' data in p',p)}
                                    console.log('q for practice',q);
                                    return <span key={id}  onClick={()=>OptionClicked(q._id,{o},id,q.CorrectAns,q.Marks)} className={`text-black  gap-[20px] ${(id==activeOption) ? 'bg-gray-600' : 'bg-red-600'} active:text-blue-600 inline-flex w-[15%] h-[40px] cursor-pointer items-center justify-center rounded-full  px-8 py-1 text-sm font-medium text-gray-50 hover:bg-gray-800`}>{o}</span>
                                })} 
                                
                            </div>
                            

                            {
                                currentSlide==question.length-1 && 
                                <div>
                                    <button className='bg-gradient-to-r from-green-400 to-blue-500 text-center hover:from-pink-500 hover:to-yellow-500 text-lg  w-[15%] pt-[1%] pb-[1%] rounded-3xl' onClick={Submit}>
                                        Submit
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                    
                ))}
            </Slider>
        </div>
    );
};

export default QuizList;