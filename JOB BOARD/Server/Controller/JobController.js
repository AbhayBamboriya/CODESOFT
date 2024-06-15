import Job from "../Models/jobModel.js";
import AppError from "../utils/error.js"

const createJob =async(req,res,next)=>{
    try{
        console.log(req.body);
        const {title,venue,stipend,deadline,company,type,experience,description,salary,perks,skills}=req.body;
        if(!title || !venue || !perks || !type || !salary ||!company || !stipend || !skills || !experience || !description ||!deadline){
            return next(new AppError('All fields are Required',400))
        }
        const exist=await Job.findOne ({
            title
        }).and  ([{company,type}])
        // console.log('exist',exist);
        if (exist){
            
            return next(new AppError('Job already posted',400))
        }
        console.log('ttt');
        const creatingJob=await Job.create({
            title,
            company,
            stipend,
            salary,
            description,
            experience,
            deadline,
            venue,
            perks,
            skills,
            type
        })
        console.log('sss');
        if(!creatingJob){
            return next(new AppError('Job Creation Failed',400))
        }

        await creatingJob.save()

        res.status(201).json({
            success:true,
            message:"Job Posted Successfully",
            createJob
        })
            
        

    }
    catch(e){
        return next(new AppError(e.message,500))
    }
}

const getAllJob=async(req,res,next)=>{
    try{
        const Jobs=await Job.find({}).and([{type:'Job'}])
        res.status(200).json({
            success:true,
            message:'All Jobs',
            Jobs
        })
    }
    catch(e){
        return next(new AppError(e.message,500))
    }
}

const getAllInernship=async(req,res,next)=>{
    try{
        const Internship=await Job.find({}).and([{type:'Internship'}])
        res.status(200).json({
            success:true,
            message:'All Jobs',
            Internship
        })
    }
    catch(e){
        return next(new AppError(e.message,500))
    }
}

const getInternshipByTitle=async(req,res,next)=>{
    try{
        const {title}=req.params
        console.log('get',title);
        const Internship=await Job.find({}).and([{title,type:"Internship"}])
        res.status(200).json({
            success:true,
            message:'All Jobs',
            Internship
        })
    }
    catch(e){
        return next(new AppError(e.message,500))
    }
}


const getJobByTitle=async(req,res,next)=>{
    try{
        const {title}=req.params
        console.log('get',title);
        const Jobs=await Job.find({}).and([{title,type:"Job"}])
        res.status(200).json({
            success:true,
            message:'All Jobs',
            Jobs
        })
    }
    catch(e){
        return next(new AppError(e.message,500))
    }
}


const filterByVenue=async(req,res,next)=>{
    try{
        const {title}=req.params
        const {venue}=req.body
        console.log('get',title);
        const Jobs=await Job.find({}).and([{title,venue}])
        res.status(200).json({
            success:true,
            message:'All Jobs',
            Jobs
        })
    }
    catch(e){
        return next(new AppError(e.message,500))
    }
}



export {
    createJob,
    getAllJob,
    getAllInernship,
    filterByVenue,
    getInternshipByTitle,
    getJobByTitle
}