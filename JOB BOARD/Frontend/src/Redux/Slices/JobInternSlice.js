import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import jobInstance from "../../Helpers/jobInstance";
import { useEffect, useState } from "react";


const initialState={
    filteredData:[]
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

export const FindingByID=createAsyncThunk('/find',async(id)=>{
    try{
        const res=jobInstance.get(`/${id}`)
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})




const internJobSlice=createSlice({
    name:'internJobSlice',
    initialState,
    reducers:{
        filteredData:(state,action)=>{
            console.log('in filter',action);
            state.filteredData=state.internship.filter(internship=>internship.venue.includes(action.payload))
            // console.log('seeing result-',state.internship);
            console.log('seeing result',state.services.internship.filter(internship=>internship.venue.includes(action.payload))  );
        }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(AllInternship.fulfilled,(state,action)=>{
        //    console.log('in state internship',action);
            localStorage.setItem("internship",action?.payload?.Internship)
            state.internship=action?.payload?.Internship
        })

        .addCase(FindingByID.fulfilled,(state,action)=>{
            // console.log('action is d',action);
            localStorage.setItem('details of post',action?.payload?.job)
            state.detail=action?.payload?.job
        })
        
        .addCase(AllJobs.fulfilled,(state,action)=>{
            // console.log('in state job',action);
             localStorage.setItem("job",action?.payload?.Jobs)
             state.job=action?.payload?.Jobs
         })
        
    }
})
export const {filteredData}=internJobSlice.actions

export default internJobSlice.reducer