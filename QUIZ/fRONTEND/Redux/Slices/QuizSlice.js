import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import quizInstance from "../../Helpers/QuizInstance";
import { data } from "autoprefixer";


// initial state of auth slice
const initialState={
  
    AllQuiz:localStorage.getItem('AllQuiz')

}  


export const StartQuiz=createAsyncThunk('/:id/:id',async(data)=>{
    try{
        console.log('data in slice',data.QuizId);
        console.log('data',data);
        const res=await quizInstance.get(`/${data.QuizId}/${data.userId}`)
        console.log('res from faiz',res);
        return (await res).data
    }
    catch(e){
        // toast.error()
        toast.error(e?.response?.data?.message, {
            position: "top-right",
        });
    }
    
})


export const AddedQuestion=createAsyncThunk('/format/:id',async(data)=>{
    try{
        console.log('data and id',data);
        const res=await quizInstance.post(`/append/${data.QuizId}`,data.postData)
        console.log('res is abaha',res);
        return (await res).data
    }
    catch(e){
        // toast.error()
        toast.error(e?.response?.data?.message, {
            position: "top-right",
        });
    }
})


export const DeleteQuiz=createAsyncThunk('delete',async (data)=>{
    try{
        console.log('data for delete quiz',data);
        const res=await quizInstance.delete(`/deleteQuiz/${data}`)
        console.log('res is frno backend dleete',res);
        return (await res).data
    }
    catch(e){
        // toast.error()
        toast.error(e?.response?.data?.message, 
            {
            position: "top-right",
        }
    );}

})
export const PostQuiz=createAsyncThunk('/createQuiz',async(data)=>{
    try{
        console.log('data in slice',data.QuizId);
        console.log('data',data);
        const res=await quizInstance.post(`/post`,data)
        console.log('res from faiz',res);
        return (await res).data
    }
    catch(e){
        // toast.error()
        console.log('errorin postQuiz',e);
        toast.error(e?.response?.data?.message);
    }
})

export const AppendQuiz=createAsyncThunk('/append',async(data)=>{
    try{
        const res=await quizInstance.post('/add',data)
        return (await res).data
    }
    catch(e){
        // toast.error()
        // console.log('errorin postQuiz',e);
        toast.error(e?.response?.data?.message);
    }
})

export const Check=createAsyncThunk('/check',async()=>{
    try{
        const res=await quizInstance.get('/check')
        return (await res).data
    }
    catch(e){
        // toast.error()
        // console.log('errorin postQuiz',e);
        toast.error(e?.response?.data?.message);
    }

})
export const My_Quiz=createAsyncThunk('/myQuiz',async()=>{
    try{
        const res=await quizInstance.get('/myQuiz')
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