import mongoose, { Schema,Model } from "mongoose";
const locationSchema = new mongoose.Schema({
    name: String,
    // coordinates: {
    //   type: { type: String, default: 'Point' }, // Set the type to 'Point' by default
    //   coordinates: { type: [Number], required: true } // Array containing longitude and latitude values
    // }
  });
const JobSchema =  new Schema({
    title:{
        type:'String',
        required:[true,'Title is Required'],
        lowercase:true,
        trim:true,
    },
    venue:{
        type:'String',
        requried:[true,'Venue is required'],
        lowercase:true,
        trim:true,
        unique:false
    },
    company:{
        type:'String',
        requried:[true,'Company is required'],
        lowercase:true,
        trim:true,

    },
    apply:[{
        id:{
            type:'String',
            required:[true,'Id are Requried']
        },
        domain:{
            type:'String',
            required:[true,'Domain are Requried']
        },
        resume:{
            public_url:{
                type:'String'
            },
            secure_url:{
                type:'String'
            }
        }
    }],

    perks:[{
        type:'String',
        required:[true,'Perks are Requried']
    }],
    type:{
        type:'String',
        enum:['Internship','Job'],
        required:[true,'Type is requried']
    },
    skills:[{
        type:'String',
        required:[true,'Perks are Requried']
    }],
    stipend:{
        type:'Number',
        reqired:[true,'Stipend is Required'],
    },
    id:{
        type:'String',
        reqired:[true,'ID is Required'],
    },
    deadline:{
        type:'Date',
        requried:[
            true,'Deadline is required'
        ]
    },
    experience:{
        type: 'String'||'Number',
        requried:[
            true,'Experience is required'
        ]
    },
    description:{
        type:'String',
        requried:[true,'description is required']
    },
    // category:{
    //     type:'String',
    //     required:[true,'category is requried']
    // },
    salary:{
        type:'Number' || 'String',
        requried:[true,'Salary is required']
    },
    },{
    timestamps:true     
    }
)


const Job = mongoose.model('JobSchema',JobSchema)
// console.log('model is  ',JobSchema);
export default Job