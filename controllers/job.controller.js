import { Job } from "../models/job.model.js";

export const postJob = async (req,res) =>{
    try {
        const {title,description,requirements,salary,location,jobType,position,experience,companyId} = req.body;
        const userId = req.id;

        if(!title || !description || !requirements ||!salary || !location || !jobType ||!position || !experience||!companyId){
            return res.status(400).json({
                message:"All Fields are Required",
                status: false
            })
        }
        
        const job = await Job.create({
            title,
            description,
            requirements,
            salary:Number(salary),
            location,
            jobType,
            position,
            experienceLevel:experience,
            created_by:userId,
            company:companyId
        });

        return res.status(201).json({
            message:"Job Posted Successfully",
            status: true,
            job
        })
    } catch (error) {
        console.log(error);
    }
}


export const getallJobs = async(req,res)=>{
    try {
        const keyword = req.params.keyword || "";
        const query = {
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]
        }
        
        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not Found",
                success:false
            })
        }

        return res.status(200).json({
            message:"Job Found Successfully",
            success:true,
            jobs
        })


    } catch (error) {
        console.log(error);
    }
}


export const getJobById = async(req,res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Job Found Successfully",
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

//admin kitne job create kiya hai abhi thk

export const getAdminJobs = async(req,res) =>{
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId});

        if(!jobs){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }

        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
       console.log(error);
    }
}

