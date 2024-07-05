import { Router } from "express";
import { AddQuestion, AddQuiz, AllQuiz, Question, QuizPost, deleteQuestion, deleteQuiz, formatting } from "../Controller/QuizConttroller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router =Router(); 

router.post('/post',isLoggedIn,QuizPost);
router.post('/append/:QuizId',isLoggedIn,AddQuestion)
router.post('/format/:QuizId',isLoggedIn,formatting)
router.delete('/delete/:QuizId',isLoggedIn,deleteQuestion)
router.post('/add/:QuizId',isLoggedIn,AddQuiz)
router.delete('/deleteQuiz/:QuizId',isLoggedIn,deleteQuiz)
router.get('/',isLoggedIn,AllQuiz)
router.get('/:Quizid/:userId',Question)
// router.get('/:QuizId',Ques)
export default router