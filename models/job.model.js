import mongooose from 'mongoose';

const jobSchema = new mongooose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    experienceLevel:{
        type: Number,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    jobType:{
        type: String,
        required: true
    },
    position:{
        type: Number,
        required: true
    },
    company:{
        type:mongooose.Schema.Types.ObjectId,
        ref:'Company',
        required: true
    },
    created_by:{
        type:mongooose.Schema.Types.ObjectId,
        ref:'User',
    },
    appplication:[{
        type:mongooose.Schema.Types.ObjectId,
        ref:'Application',
    }]
},{timestamps:true})

export const Job = mongooose.model("Job",jobSchema);