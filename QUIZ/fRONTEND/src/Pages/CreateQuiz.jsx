import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { AppendQuiz, Check, PostQuiz } from '../../Redux/Slices/QuizSlice';
import { FaBackward } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

function CreateQuiz() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [postData, setPostData] = useState({
        Subject: "",
        CreatedBy: "",
        Questions: [
            {
                Question: "",
                CorrectAns: "",
                Options: ["", "", "", ""],
                Marks: ''
            }
        ]
    });

    const dispatch = useDispatch();

    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setPostData({
            ...postData,
            [name]: value
        });
    };

    const handleQuestionChange = (index, e) => {
        const { name, value } = e.target;
        const questions = [...postData.Questions];
        questions[index][name] = value;
        setPostData({
            ...postData,
            Questions: questions
        });
    };

    const handleOptionChange = (qIndex, oIndex, e) => {
        const questions = [...postData.Questions];
        questions[qIndex].Options[oIndex] = e.target.value;
        setPostData({
            ...postData,
            Questions: questions
        });
    };

    const handleAddQuestion = () => {
        setPostData({
            ...postData,
            Questions: [
                ...postData.Questions,
                { Question: "", CorrectAns: "", Options: ["", "", "", ""], Marks: "" }
            ]
        });
    };

    const handleRemoveQuestion = (index) => {
        const questions = postData.Questions.filter((_, i) => i !== index);
        setPostData({
            ...postData,
            Questions: questions
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validate fields
        if (!postData.CreatedBy || !postData.Subject || !postData.Questions) {
            setLoading(false);
            return toast.error("All Fields are Required");
        }

        for (const q of postData.Questions) {
            if (!q.Question || !q.CorrectAns || !q.Options || !q.Marks) {
                setLoading(false);
                return toast.error("All Fields of Question are Required");
            }

            if (q.Options.some(option => option === "")) {
                setLoading(false);
                return toast.error("All Options are Required");
            }
        }
        const res1=await dispatch(Check())
        console.log('frontend response check',res1);
        if(res1?.payload?.success){
          const r=await dispatch(AppendQuiz(postData))
          console.log('r in papa',r);
          if (r?.payload?.success) {
            // console.log('checking result', res);
            toast.success(r?.payload?.message);
            navigate('/mainpage');
        } else {
            toast.error(r?.payload?.message || 'An error occurred');
        }
        }
        else{
          const res = await dispatch(PostQuiz(postData));
            if (res?.payload?.success) {
                console.log('checking result', res);
                toast.success(res?.payload?.message);
                navigate('/mainpage');
            } else {
                toast.error(res?.payload?.message || 'An error occurred');
            }
        }

        setPostData({
            Subject: "",
            CreatedBy: "",
            Questions: [
                {
                    Question: "",
                    CorrectAns: "",
                    Options: ["", "", "", ""],
                    Marks: ''
                }
            ]
        });
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            
            <div className="w-full max-w-3xl p-6 bg-gray-800 rounded-lg h-[100vh] overflow-y-auto max-h-full">
                <FaBackward className='text-2xl hover:text-emerald-500 cursor-pointer mb-4' onClick={() => navigate(-1)} />
                <h1 className="text-3xl font-bold mb-4">Create Quiz</h1>
                <form noValidate onSubmit={onSubmit} className="w-full flex flex-col gap-4">
                    <input
                        type="text"
                        required
                        name="Subject"
                        placeholder="Enter your subject"
                        className="bg-gray-700 p-2 rounded"
                        onChange={handleUserInput}
                        value={postData.Subject}
                    />
                    <input
                        type="text"
                        required
                        name="CreatedBy"
                        placeholder="Enter your name"
                        className="bg-gray-700 p-2 rounded"
                        onChange={handleUserInput}
                        value={postData.CreatedBy}
                    />
                    {postData.Questions.map((question, qIndex) => (
                        <div key={qIndex} className="bg-gray-700 p-4 rounded mb-4">
                            <input
                                type="text"
                                required
                                name="Question"
                                placeholder="Enter your question"
                                className="bg-gray-600 p-2 rounded mb-2 w-full"
                                onChange={(e) => handleQuestionChange(qIndex, e)}
                                value={question.Question}
                            />
                            <input
                                type="text"
                                required
                                name="CorrectAns"
                                placeholder="Enter correct answer"
                                className="bg-gray-600 p-2 rounded mb-2 w-full"
                                onChange={(e) => handleQuestionChange(qIndex, e)}
                                value={question.CorrectAns}
                            />
                            <div className="grid grid-cols-2 gap-2 mb-2">
                                {question.Options.map((option, oIndex) => (
                                    <input
                                        key={oIndex}
                                        type="text"
                                        required
                                        placeholder={`Option ${oIndex + 1}`}
                                        className="bg-gray-600 p-2 rounded"
                                        onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                                        value={option}
                                    />
                                ))}
                            </div>
                            <input
                                type="number"
                                required
                                name="Marks"
                                placeholder="Enter marks"
                                className="bg-gray-600 p-2 rounded mb-2 w-full"
                                onChange={(e) => handleQuestionChange(qIndex, e)}
                                value={question.Marks}
                            />
                            {postData.Questions.length > 1 && (
                                <button type="button" onClick={() => handleRemoveQuestion(qIndex)} className="text-red-500">
                                    Remove Question
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={handleAddQuestion} className="bg-blue-500 p-2 rounded">
                        Add Question
                    </button>
                    <button
                        type="submit"
                        className="bg-green-500 p-2 rounded"
                    >
                        {loading ? 'Creating Quiz...' : 'Create Quiz'}
                    </button>
                    <ToastContainer />
                </form>
            </div>
        </div>
    );
}

export default CreateQuiz;
