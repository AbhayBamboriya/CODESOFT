import React from 'react'

const View = () => {
    
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
  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Quiz Questions</h1>
    <div className="space-y-4">
        {quizData.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-md">
                <h2 className="text-xl font-semibold mb-2">{item.question}</h2>
                <ul className="list-disc list-inside">
                    {item.options.map((option, idx) => (
                        <li key={idx} className={`mb-1 ${option === item.correctAnswer ? 'text-green-600' : ''}`}>
                            {option}
                        </li>
                    ))}
                </ul>
                <div className="mt-2">
                    <span className="font-medium">Correct Answer: </span>{item.correctAnswer}
                </div>
                <div className="mt-2">
                    <span className="font-medium">Marks: </span>{item.marks}
                </div>
            </div>
        ))}
    </div>
</div>
  )
}

export default View