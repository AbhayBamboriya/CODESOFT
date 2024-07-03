import Quiz from "../Models/Quiz.model.js";
import User from "../Models/User.Models.js";
import AppError from "../utils/error.js";
import {v4 as uuidv4} from 'uuid'
const QuizPost  = async(req,res,next)=>{
    try {
        const {userId} =req.user
        const { Questions,Subject } = req.body;
        if (!userId || !Questions || !Subject) {
            return res.status(400).json({ message: 'UserId ,Questions,Subject are required' });
        }

        // const exist =await Quiz.findById
        const formattedQuestions = Questions.map(question => ({
            // Subject:Subject,
            Question: question.Question,
            Options: question.Options,
            CorrectAns: question.CorrectAns,
            Marks: question.Marks
        }));
        console.log(formattedQuestions);
            const newQuiz = new Quiz({
                userId: userId,
                Quiz: [
                    {
                        _id: uuidv4(),
                        Subject:Subject,
                        Questions: formattedQuestions
                    }
                ]
            });
            await newQuiz.save();
            res.status(201).json({message:'Created Quiz Successfully',Quiz:newQuiz}); 
    } catch (error) {
        res.status(500).json({ message: error.message, error });
    }
}


const AddQuiz=async(req,res,next)=>{
    try{
        // these is for appending new quiz with the existing quiz
        const {userId}=req.user
        const {QuizId}=req.params
        const { Questions,Subject } = req.body; 
        if(!userId){
            new AppError('Please Login to Post the quiz',400)
        }

        if(!Questions || !Subject){
            new AppError('Question and Subject are required',400)
        }
        const formattedQuestions = Questions.map(question => ({
            // _id: uuidv4(),
            Question: question.Question,
            Options: question.Options,
            CorrectAns: question.CorrectAns,
            Marks: question.Marks
        }));
        // console.log(userId,QuizId);
        const exist=await Quiz.findOne({userId})
        console.log(formattedQuestions);
        // exist.Quiz._id=uuidv4()
        exist.Quiz.push({Questions:formattedQuestions,_id:uuidv4(),Subject})
        await exist.save()
        res.status(200).json({
            success:true,
            message:'Quiz Added successfully'
        })

    }

    catch(e){
        return next(new AppError(e.message,400))
    }
}



const AddQuestion=async(req,res,next)=>{
    try{
        const {userId}=req.user
        const {QuizId}=req.params
        const { Questions } = req.body;
    const exist=await Quiz.findOne({userId})
    
    const formattedQuestions = Questions.map(question => ({
        Question: question.Question,
        Options: question.Options,
        CorrectAns: question.CorrectAns,
        Marks: question.Marks
    }));
   for(let i=0;i<exist.Quiz.length;i++){
        if(exist.Quiz[i]?._id==QuizId){
            console.log('Questions are',exist.Quiz[i]?.Questions);
            for(let j=0;j<formattedQuestions.length;j++){
                exist.Quiz[i].Questions.push({Question:formattedQuestions[j].Question,Marks:formattedQuestions[j].Marks,CorrectAns:formattedQuestions[j].CorrectAns,Options:formattedQuestions[j].Options})
            }
            console.log('After Changes',exist.Quiz[i]?.Questions);
            break

        }
    }

    await   exist.save()
  
        res.status(201).json({
            success:true,
            message:"Question Added successfully",
            exist
        })
    }
    
    catch(e){
        return next(new AppError(e.message,400))
    }

}

const formatting=async(req,res,next)=>{
    try{
        // const {QuestionId}=req.body
        const {userId}=req.user
        const { Question } = req.body;
        const { QuizId }=req.params
        const formattedQuestions = Question.map(question => ({
            QuestionId:question.QuestionId,
            Question: question.Question,
            Options: question.Options,
            CorrectAns: question.CorrectAns,
            Marks: question.Marks
        }));

        const quizDocument=await Quiz.findOne({userId})
        // console.log('formatted',formattedQuestions);

        const quiz = quizDocument.Quiz.find(quiz => quiz._id == QuizId);
        for(let i=0;i<formattedQuestions.length;i++){
            const question=quiz.Questions.find(q=>q._id==formattedQuestions[i].QuestionId)
            console.log(
                'before changes',question
            );
            if(formattedQuestions[i].Question) question.Question = formattedQuestions[i]?.Question;
            if(formattedQuestions[i].Options) question.Options = formattedQuestions[i]?.Options;
            if(formattedQuestions[i].Marks) question.Marks = formattedQuestions[i]?.Marks;
            if(formattedQuestions[i].CorrectAns)  question.CorrectAns = formattedQuestions[i]?.CorrectAns;

            console.log('after cahnges  question is',question);
        }

        // await quizDocument.save()
        res.status(201).json({
            success:true,
            message:"Question formatted successfully",
            // exist
        })
    }
    catch(e){
        return next(new AppError(e.message,400))
    }

}


const deleteQuestion = async (req, res, next) => {
    try {
        const { userId } = req.user;
        const { QuestionId } = req.body;
        const { QuizId } = req.params;

        // Find the quiz for the user
        const quizDocument = await Quiz.findOne({ userId });

        if (!quizDocument) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        // Find the quiz within the quizzes array
        const quiz = quizDocument.Quiz.find(quiz => quiz._id == QuizId);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }

        // Find the index of the question to be removed
        const questionIndex = quiz.Questions.findIndex(question => question._id == QuestionId);

        if (questionIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        // Remove the question
        quiz.Questions.splice(questionIndex, 1);

        // Save the updated document
        await quizDocument.save();

        res.status(201).json({
            success: true,
            message: "Question deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

const deleteQuiz=async (req,res,next)=>{
   try{
        const { userId } = req.user;
        const { QuizId } = req.params;
        if(!userId){
            return next(new AppError('Not Authorised to delete the quiz',400))
        }
        if(!QuizId){
            return next(new AppError('Please Provide the quiz id',400))
        }

        const quizDocument = await Quiz.findOne({ userId });
        // console.log('qd',quizDocument);
        // const quiz=quizDocument.Quiz.find
        const quizIndex = quizDocument.Quiz.findIndex(quiz => quiz._id == QuizId);
        const quiz = quizDocument.Quiz.find(quiz => quiz._id == QuizId);
        console.log('quiz is',quiz);
        console.log('idx',quizIndex);
        if (quizIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Quiz not found"
            });
        }
        console.log("Before remoival",quizDocument.Quiz[quizIndex]);
        quizDocument.Quiz.splice(quizIndex, 1);

        console.log('quiz Document',quizDocument);
        console.log("Afeter remoival",quizDocument.Quiz[quizIndex]);
        await quizDocument.save({Subject:''})
        res.status(201).json({
            success: true,
            message: "Quiz deleted successfully"
        });
   }

   catch(e){
        return next(new AppError(e.message,500))
   }
}

export{
    QuizPost,deleteQuiz,
    AddQuestion,
    deleteQuestion,
    formatting,
    AddQuiz
}