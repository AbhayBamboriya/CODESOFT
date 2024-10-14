import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { StartQuiz } from '../../Redux/Slices/QuizSlice';
import { FaBackward } from "react-icons/fa";
import './style.css'

const QuizList = () => {
    const navigate = useNavigate();
    const [option, setOption] = useState([]);
    const { userId, QuizId, check } = useParams();
    const [question, setQuestion] = useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [marks, setMarks] = useState(-1);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeOption, setActiveOption] = useState({});

    const location = useLocation();
    const path = location.pathname;
    let totalMarks = 0;

    const Submit = () => {
        setMarks(0);
        let MarksScored = 0;
        for (let i = 0; i < option.length; i++) {
            if (option[i].correctAns === option[i].choosenOption) {
                MarksScored += option[i].Marks;
            }
        }
        setMarks(MarksScored);

        navigate(`/result/${MarksScored}/${userId}/${totalMarks}/${QuizId}`);
        setOption([]);
        setQuestion([]);
        setLoading(true);
        setMarks(-1);
        setCurrentSlide(0);
        setActiveOption({});
    };

    const OptionClicked = (id, optionChoosen, opid, correctAns, Marks) => {
        setActiveOption((prev) => ({
            ...prev,
            [id]: opid, // Associate option id with question id
        }));

        const obj = {
            correctAns: correctAns,
            choosenOption: optionChoosen.o,
            opid: opid,
            id: id,
            Marks: Marks,
        };

        if (option.some(item => item.id === id)) {
            setOption(prev => prev.map(item => (item.id === id ? obj : item)));
        } else {
            setOption(prev => [...prev, obj]);
        }
    };

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await dispatch(StartQuiz({ QuizId, userId }));
                setQuestion(response?.payload?.Question);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };
        fetchQuiz();
    }, [dispatch, QuizId, userId]);

    useEffect(() => {
        // Calculate the total marks based on the fetched questions
        let total = 0;
        if (question && question.length > 0) {
            question.forEach(q => {
                totalMarks += q.Marks;
            });
        }
        // setTotalMarks(total); // Update total marks state
    }, [question]);

    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        afterChange: (index) => setCurrentSlide(index),
    };

    return (
        <div className="h-[100vh] overflow-y-scroll bg-[url('https://images.pexels.com/photos/7130545/pexels-photo-7130545.jpeg?auto=compress&cs=tinysrgb&w=600')] bg-cover bg-center">
            {path === `/quiz/${userId}/${QuizId}/false` ? (
                <div className="text-black h-screen flex flex-col items-center justify-center">
                    <Slider {...settings} className="w-[80%] h-[80%] bg-rd-800 flex items-center justify-center">
                        <div>
                            <h1 className='text-center text-5xl flex flex-col justify-center gap-[5%]'>
                                <FaBackward className='hover:text-emerald-500 cursor-pointer' onClick={() => navigate(-1)} />
                                Welcome To The Quiz
                            </h1>
                        </div>
                        {question && question.length > 0 && question.map((q, index) => (
                            <div key={index} className="flex items-center h-full justify-center bg-back">
                                <div className="text-center h-[100] bg-rd-400 flex flex-col gap-[50px]">
                                    <div className='flex flex-col items-center gap-w-full bg-back justify-around'>
                                        <h3 className="text-3xl font-bold mb-2 text-center bg-re-400 w-full flex justify-center gap-[2%]">
                                            <span>{currentSlide}).</span>
                                            <span>{q.Question}</span>
                                            {/* {totalMarks=totalMarks+q.Marks} */}
                                        </h3>
                                        <div className='grid w-full justify-items-stretch'>
                                            <div className="text-lg pl-[130px] justify-self-end mr-[5%]">
                                                Marks: {q.Marks}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-[20px] items-center text-center'>
                                        {q.Options && q.Options.map((o, id) => {
                                            const isSelected = activeOption[q._id] === id;
                                            return (
                                                <span
                                                    key={id}
                                                    onClick={() => OptionClicked(q._id, { o }, id, q.CorrectAns, q.Marks)}
                                                    className={`text-black gap-[20px] ${isSelected ? 'bg-gray-600' : 'bg-red-600'} inline-flex w-[15%] h-[40px] cursor-pointer items-center justify-center rounded-full px-8 py-1 text-sm font-medium text-gray-50 hover:bg-gray-800`}
                                                >
                                                    {o}
                                                </span>
                                            );
                                        })}
                                    </div>

                                    {currentSlide === question.length  &&
                                        <div>
                                            <button className='bg-gradient-to-r from-green-400 to-blue-500 text-center hover:from-pink-500 hover:to-yellow-500 text-lg w-[15%] pt-[1%] pb-[1%] rounded-3xl' onClick={Submit}>
                                                Submit
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            ) : (
                <div className="container mx-auto p-4 h-[100vh] overflow-y-scroll">
                    <h1 className="text-2xl font-bold mb-4">Quiz Questions</h1>
                    <div className="space-y-4">
                        {question && question.map((q, index) => (
                            <div key={index} className="bg-white p-4 rounded shadow-md">
                                <h2 className="text-xl font-semibold mb-2">{q.Question}</h2>
                                <ul className="list-disc list-inside">
                                    {q.Options.map((o, id) => (
                                        <li key={id} className={`mb-1 ${o === q.CorrectAns ? 'text-green-600' : ''}`}>
                                            {o}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-2">
                                    <span className="font-medium text-black">Correct Answer: </span>{q.CorrectAns}
                                </div>
                                <div className="mt-2">
                                    <span className="font-medium">Marks: </span>{q.Marks}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-center items-center gap-[10%] bg-lack mt-[2%]'>
                        <FaBackward onClick={() => navigate('/myQuiz')} className='text-6xl text-emerald-500 hover:text-emerald-700 cursor-pointer' />
                        <button onClick={() => navigate(`/format/${QuizId}`)} className='text-center w-full p-4 bg-emerald-500 hover:bg-emerald-600 rounded-xl'>Add Question</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizList;
