import Job from "../Models/jobModel.js";
import User from "../Models/userModel.js";
import AppError from "../utils/error.js"
import cloudinary from 'cloudinary'
import fs from 'fs/promises'
const createJob =async(req,res,next)=>{
    try{
        console.log(req.body);
        const {id}=req.params
        console.log('id is',id);
        const {title,venue,stipend,deadline,company,type,experience,description,salary,perks,skills}=req.body;
        if(!title || !id || !venue || !perks || !type || !salary ||!company || !stipend || !skills || !experience || !description ||!deadline){
            return next(new AppError('All fields are Required',400))
        }
        // if(!)
        // const exist=await Job.findOne ({
        //     id
        // }).and  ([{company,type}])
        // // console.log('exist',exist);
        // if (exist){
            
        //     return next(new AppError('Job already posted',400))
        // }
        console.log('ttt');
        const creatingJob=await Job.create({
            title,
            id,
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

const getById=async (req,res,next)=>{
    try{
        const {id}=req.params
        console.log('id is',id);
        const job=await Job.findById(id)
        console.log('req',job);
        res.status(200).json({
            success:true,
            message:'Jobs',
            job
        })
    }
    catch(e){
        return next(new AppError(e.message,500))
    }
} 

const FindById=async (req,res,next)=>{
    try{
        const {Id}=req.params
        console.log('id is',Id);
        // const job=await Job.findById(id)

        // const exist=await Job.findOne ({
        //     id
        // }).and  ([{company,type}])

        const AllPost=await Job.find ({
            id:Id
        })
        
        res.status(200).json({
            success:true,
            message:'Jobs',
            AllPost
        })
    }
    catch(e){
        return next(new AppError(e.message,500))
    }
} 

const apply=async (req,res,next)=>{
    try{
        const {companyId}=req.params
        const {type,userId}=req.body;
        console.log(req.body);
        console.log(companyId," ",type," ",userId," ",req.file);
        const user=await User.findById(userId)
        const company=await Job.findById(companyId)
        let publicURL=userId
        let secureUrl='cloudinary://378171611453713:jar_yV68UrVNSKbFbxleqoBxKJQ@dix9kn7zm'
        if(req.file){
            
            try{
                // const result=await cloudinary.v2.uploader.upload(req.file.path,{
                //     // at which folder you have to upload the image
                //     folder:'JOB_PORTAL',
                //     // width:250,
                //     // height:250,
                //     // gravity is used to auto focus
                //     // gravity:'faces',
                //     // crop:'fill'
                // })

                // cloudinary.uploader.upload("path/to/your/file.pdf", { resource_type: "raw" }, function(error, result) {
                //     console.log(result, error);
                //   });

                 const result= await cloudinary.uploader.upload(req.file.path, { resource_type: "raw" }, function(error, result) {
                    if (result) {
                    //   console.log("PDF URL:", result.url);
                    } else {
                    //   console.log("Error:", error);
                    }
                  });

                // console.log('res',result);
                // try
                if(result){
                    publicURL=result.public_id
                    secureUrl=result.secure_url    
                    // console.log("URL IMAGE",result.secure_url);

                    // remove file from local system/server
                    // fs.rm(`uploads/${req.file.filename}`)

                }
            }catch(e){
                return next(
                    new AppError(e.message || 'File not uploaded,please try again',500)
                )
            }
        }
        const obj={
            public_url:publicURL,
            secure_url:secureUrl   
        }
        // console.log('obj is',obj);
        company.apply.push({id:userId,domain:type,resume:obj})
        // console.log('company is',companyId);
        user.apply.push({id:companyId,domain:type,resume:obj})
        // console.log('printing detail',user);
        await company.save()
        await user.save()
        res.status(200).json({
            success:true,
            message:'Applied for the job'
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
    ,getById,
    apply,
    FindById
}