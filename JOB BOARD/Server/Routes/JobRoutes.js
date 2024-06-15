import { Router } from "express";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { createJob, filterByVenue, getAllInernship, getAllJob, getInternshipByTitle, getJobByTitle } from "../Controller/JobController.js";
const router =Router(); 



router.post('/post',createJob)
router.get('/Job',getAllJob)
router.get('/Internship',getAllInernship)
router.get('/internship/:title',getInternshipByTitle)
router.get('/Job/:title',getJobByTitle)
router.get('/venue/:title',filterByVenue)
export default router   