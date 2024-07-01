import Quiz from "../Models/Quiz.model.js";
import User from "../Models/User.Models.js";
import AppError from "../utils/error.js";
import {v4 as uuidv4} from 'uuid'
const QuizPost  = async(req,res,next)=>{
    try {
        const {userId} =req.user
        const { Questions } = req.body;
        if (!userId || !Questions) {
            return res.status(400).json({ message: 'UserId and quiz data are required' });
        }

        // const exist =await Quiz.findById
        const formattedQuestions = Questions.map(question => ({
            Question: question.Question,
            Options: question.Options,
            CorrectAns: question.CorrectAns,
            Marks: question.Marks
        }));
            const newQuiz = new Quiz({
                userId: userId,
                Quiz: [
                    {
                        _id: uuidv4(),
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
        const { Questions } = req.body; 
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
        exist.Quiz.push({Questions:formattedQuestions,_id:uuidv4()})
        await exist.save()
            res.status(201).send('finished')

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
        console.log('issss',userId,QuizId,Question);
        const formattedQuestions = Question.map(question => ({
            QuestionId:question.QuestionId,
            Question: question.Question,
            Options: question.Options,
            CorrectAns: question.CorrectAns,
            Marks: question.Marks
        }));

        const exist=await Quiz.findOne({userId})
        console.log('formatted',formattedQuestions);
        for(let j=0;j<exist.Quiz.length;j++){
            if(exist.Quiz[j]._id==QuizId){
                for(let t=0;t<exist.Quiz[j].Questions.length;t++){
                    for(let g=0;g<formattedQuestions.length;g++){
                        console.log('iddfdjdf',formattedQuestions[g].QuestionId);
                        if (exist.Quiz[j]?.Questions[t]?._id == formattedQuestions[g].QuestionId) {
                            // console.log('lhohhohoh',formattedQuestions[0]?.Question);
    
    
    
                            if(formattedQuestions[g].Question)exist.Quiz[j].Questions[t].Question = formattedQuestions[g]?.Question;
                            if(formattedQuestions[g]?.Options)exist.Quiz[j].Questions[t].Options = formattedQuestions[g]?.Options;
                            if(formattedQuestions[g]?.Marks)exist.Quiz[j].Questions[t].Marks = formattedQuestions[g]?.Marks;
                            if(formattedQuestions[g]?.CorrectAns)exist.Quiz[j].Questions[t].CorrectAns = formattedQuestions[g]?.CorrectAns;
                            break;
                        }
                    }
                    
                }
                break
            }

        }
       
        // exist.Quiz[1]
        await exist.save()
        res.status(201).json({
            success:true,
            message:"User registered successfully",
            // exist
        })
    }
    catch(e){
        return next(new AppError(e.message,400))
    }

}

const deleteQuestion=async(req,res,next)=>{
    const {userId}=req.user
    const { QuestionId } = req.body;
    const { QuizId }=req.params
    const exist=await Quiz.findOne({userId})
        // console.log('formatted',formattedQuestions);
        let formattedQuestions=[]
        for(let j=0;j<exist.Quiz.length;j++){
            if(exist.Quiz[j]._id==QuizId){
                for(let t=0;t<exist.Quiz[j].Questions.length;t++){
                    // for(let g=0;g<formattedQuestions.length;g++){
                        // console.log('iddfdjdf',formattedQuestions[g].QuestionId);
                        if (exist.Quiz[j]?.Questions[t]?._id ==QuestionId) {
                            // console.log(exist.Quiz[j]?.Questions[t]);
                            // exist.Quiz[j]?.Questions.push(exist.Quiz[j]?.Questions[t])
                            // formattedQuestions.push(exist.Quiz[j]?.Questions[t])
                            // exist.Quiz[i].Questions.push({Question:formattedQuestions[j].Question,Marks:formattedQuestions[j].Marks,CorrectAns:formattedQuestions[j].CorrectAns,Options:formattedQuestions[j].Options})
                            console.log('acksdjffdfjfdhf',exist.Quiz[j]?.Questions[t]);
                            await exist.Quiz[j]?.Questions[t].remove()
                        }
                        
                    // }
    
                }
                break
            }

        }
        // for(let i=0;i<exist.Quiz.length;i++){
  
        //         for(let j=0;j<formattedQuestions.length;j++){
        //             exist.Quiz[i].Questions.push({Question:formattedQuestions[j].Question,Marks:formattedQuestions[j].Marks,CorrectAns:formattedQuestions[j].CorrectAns,Options:formattedQuestions[j].Options})
        //         }
               
    
            
        // }
    
      
        // exist.Quiz[1]
        // console.log('for',formattedQuestions);
        await exist.save()
        res.status(201).json({
            success:true,
            message:"Question Deleted successfully",
            // exist
        })

}
export{
    QuizPost,
    AddQuestion,
    deleteQuestion,
    formatting,
    AddQuiz
}