import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import jobInstance from "../../Helpers/jobInstance";


const initialState={
    
}  

export const AllInternship=createAsyncThunk('/auth/intern',async() =>{
    try{
        const res=jobInstance.get('/Internship')
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})


export const AllJobs=createAsyncThunk('/',async()=>{
    try{
        const res=jobInstance.get('/Job')
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})
const internJobSlice=createSlice({
    name:'internJobSlice',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(AllInternship.fulfilled,(state,action)=>{
           console.log('in state internship',action);
            localStorage.setItem("internship",action?.payload?.Internship)
            state.internship=action?.payload?.Internship
        })

        .addCase(AllJobs.fulfilled,(state,action)=>{
            console.log('in state job',action);
             localStorage.setItem("job",action?.payload?.Jobs)
             state.job=action?.payload?.Jobs
         })
        
    }
})


export default internJobSlice.reducer