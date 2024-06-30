import { Router } from "express";
import {  changePassword, checkUser, forgotPassword, login, logout, register, resetPassword } from "../Controller/UserController.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
const router =Router(); //creating instance
router.post('/register',register)   //in upload single file orhow many file u have to upload
router.post('/login',login) 
router.get('/logout',logout)
router.post('/reset',forgotPassword);
router.post('/check',checkUser)
router.post('/password/:resetToken',resetPassword) 
router.post('/changePassword',isLoggedIn,changePassword)
// router.post('/user/:id',isLoggedIn,allUser)
// router.get('/detail',isLoggedIn,detail)

export default router