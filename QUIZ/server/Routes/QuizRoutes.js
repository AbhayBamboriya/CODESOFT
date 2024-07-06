import { Router } from "express";
import { AddQuestion, AddQuiz, AllQuiz, MyQuiz, Question, QuizPost, check, deleteQuestion, deleteQuiz, formatting } from "../Controller/QuizConttroller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { checkUser } from "../Controller/UserController.js";

const router =Router(); 

router.post('/post',isLoggedIn,QuizPost);
router.post('/append/:QuizId',isLoggedIn,AddQuestion)
router.post('/format/:QuizId',isLoggedIn,formatting)
router.delete('/delete/:QuizId',isLoggedIn,deleteQuestion)
router.post('/add',isLoggedIn,AddQuiz)
router.delete('/deleteQuiz/:QuizId',isLoggedIn,deleteQuiz)
router.get('/',isLoggedIn,AllQuiz)
router.get('/myQuiz',isLoggedIn,MyQuiz)
router.get('/:Quizid/:userId',Question)
router.get('/check',isLoggedIn,check)
// router.get('/:QuizId',Ques)
export default router