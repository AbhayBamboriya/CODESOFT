import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import quizInstance from "../../Helpers/QuizInstance";


// initial state of auth slice
const initialState={
  
    AllQuiz:localStorage.getItem('AllQuiz')

}  

export const StartQuiz=createAsyncThunk('/:id/:id',async(data)=>{
    try{
        console.log('data in slice',data.QuizId);
        console.log('data',data);
        const res=await quizInstance.get(`/${data.QuizId}/${data.userId}`)
        console.log('res from faiz');
        return (await res).data
    }
    catch(e){
        // toast.error()
        toast.error(e?.response?.data?.message, {
            position: "top-right",
        });
    }
    
})

export const AllQuiz=createAsyncThunk('/mainpage',async()=>{
    try{
        const res=await quizInstance.get('/')
        console.log('res',await res);
        return (await res).data
    }
    catch(e){
        // toast.error()
        toast.error(e?.response?.data?.message, {
            position: "top-right",
        });
    }
})





const Quiz=createSlice({
    name:'Quiz',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        // if login in successfull then what to ds
        builder
        .addCase(AllQuiz.fulfilled,(state,action)=>{
            // setting the data in the form of string 
            // we have stored in local storage because
            // statte will be fetched from local storage
            // current state will not be accessed from the local storage thatswhy we have saved in the state
            console.log('a');
            console.log('sate',action?.payload?.quiz);
            // localStorage.setItem("AllQuiz",JSON.stringify(action?.payload?.user))
            localStorage.setItem("AllQuiz",action?.payload?.quiz)
            // localStorage.setItem("role",action?.payload?.user?.role)
            state.AllQuiz=action?.payload?.quiz
            // state.data=action?.payload?.user
            // state.role=action?.payload?.user?.role
            
        })
        
    }
})

// export const {}=authSlice.actions
export default Quiz.reducer