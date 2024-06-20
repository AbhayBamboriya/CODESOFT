import { Router } from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { createJob, filterByVenue, getAllInernship, getAllJob, getInternshipByTitle, getById, getJobByTitle, apply } from "../Controller/JobController.js";
import upload from "../middleware/multer.middleware.js";
const router =Router(); 



router.post('/post',createJob)
router.get('/Job',getAllJob)
router.get('/Internship',getAllInernship)
router.get('/internship/:title',getInternshipByTitle)
router.get('/Job/:title',getJobByTitle)
router.get('/venue/:title',filterByVenue)
router.get('/:id',getById)
router.post('/:companyId',upload.single("resume"),apply)
// router.post('/register',upload.single("profile"),register)  
export default router   