import { Router } from "express";
import { AddQuestion, AddQuiz, AllQuiz, MyQuiz, Question, QuizPost, check, deleteQuestion, deleteQuiz, formatting } from "../Controller/QuizConttroller.js";
import { authorisedRoles, isLoggedIn } from "../middleware/auth.middleware.js";
import { checkUser } from "../Controller/UserController.js";

const router =Router(); 

router.post('/post',isLoggedIn,authorisedRoles("Teacher"),QuizPost);
router.post('/append/:QuizId',isLoggedIn,authorisedRoles("Teacher"),AddQuestion)
router.post('/format/:QuizId',isLoggedIn,authorisedRoles("Teacher"),formatting)
router.delete('/delete/:QuizId',isLoggedIn,authorisedRoles("Teacher"),deleteQuestion)
router.post('/add',isLoggedIn,authorisedRoles("Teacher"),AddQuiz)
router.delete('/deleteQuiz/:QuizId',isLoggedIn,authorisedRoles("Teacher"),deleteQuiz)
router.get('/',isLoggedIn,AllQuiz)
router.get('/myQuiz',isLoggedIn,authorisedRoles("Teacher"),MyQuiz)
router.get('/:Quizid/:userId',isLoggedIn,Question)
router.get('/check',isLoggedIn,check)

export default router

