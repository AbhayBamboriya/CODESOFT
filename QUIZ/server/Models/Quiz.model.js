import mongoose, { Schema,Model } from "mongoose";
// const { v4: uuidv4 } = require('uuid');
import {v4 as uuidv4} from 'uuid'
const QuizSchema =  new Schema({
    userId:{
        type:'String',
        required:[true,'UserId is required']
    },
        Quiz:[{
            // _id: uuidv4(),
            Subject:{
                type:'String',
                // required:[true,'Subject is Required']
            },
            _id:{
                type:'String'
            },
            Questions: [{
                Question: {
                    type: String,
                    required: [true, 'Question is required'],
                },
                Options: {
                    type: [String], // Correctly define Options as an array of strings
                    required: [true, 'Options are required']

                },
                CorrectAns: {
                    type: String,
                    required: [true, 'Correct Answer is required'],
                },
                Marks: {
                    type: Number,
                    required: [true, 'Marks are required']
                }
            }]
        } ]       ,


    forgotPasswordToken:String,
    forgotPasswordExpiry:Date  ,
    },{
    timestamps:true     
    }
)



const Quiz = mongoose.model('QuizSchema',QuizSchema)
export default Quiz