import { Router } from "express";
import {  changePassword, checkUser, forgotPassword, login, logout, register, resetPassword } from "../Controller/UserController.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
const router =Router(); 
router.post('/register',register)   
router.post('/login',login) 
router.get('/logout',isLoggedIn,logout)
router.post('/reset',forgotPassword);
router.post('/check',checkUser)
router.post('/password/:resetToken',resetPassword) 
router.post('/changePassword',isLoggedIn,changePassword)
export default router