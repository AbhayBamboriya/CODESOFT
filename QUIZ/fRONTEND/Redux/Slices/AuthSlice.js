import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/AxiosInstance";
import { toast } from "react-toastify";


// initial state of auth slice
const initialState={
    isLoggedIn:localStorage.getItem('isLoggedIn')   || false,
    role:localStorage.getItem('role') || "",
    data:localStorage.getItem('data') || "",
    UserId:localStorage.getItem('UserId') || ""

}  

export const createAccount=createAsyncThunk('/auth/signup',async(data, { rejectWithValue }) => {
    try{
        console.log('data in slice0,',data);
        const res=await axiosInstance.post("/user/register",data)
        console.log('res'+await res);
        return (await res).data
    }
    catch(e){
        // toast.error(e?.response?.data?.message)
         toast.error(e?.response?.data?.message, {
            position: "top-right",
        });
    }
})




export const login=createAsyncThunk('/auth/login',async(data) =>{
    try{
        console.log('data is ,',data);
        const res=await axiosInstance.post("/user/login",data)
        return (await res).data
    }
    catch(e){
        // toast.error()
        toast.error(e?.response?.data?.message, {
            position: "top-right",
        });
    }
})

export const Logout = createAsyncThunk("/auth/logout",async ()=>{
    try{
        const res=axiosInstance.get("/user/logout")
        console.log('res'+(await res).data);
        // toast.promise(res,{
        //     loading:"Wait! Logout in Progress ",
            
        //     success:(data)=>{
        //         return data?.data?.message
        //     },
        //     error:"Failed to Logout"
        // });
        // console.log('check');
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})

// export const updateProfile = createAsyncThunk("/user/update/profile",async (data)=>{
//     try{
//         const res=axiosInstance.put(`user/update/${data[0]}`,data[1])
//         toast.promise(res,{
//             loading:"Wait! Profile Update in Progress ",
            
//             success:(data)=>{
//                 return data?.data?.message
//             },
//             error:"Failed to Update Profile"
//         });
//         // console.log('check');
//         return (await res).data
//     }
//     catch(e){
//         toast.error(e?.response?.data?.message)
//     }
// })

export const getUserData = createAsyncThunk("/user/details",async ()=>{
    try{
        const res=axiosInstance.get("/user/me")
        
        // console.log('check');
        return (await res).data
    }
    catch(e){
        toast.error(e.message)
    }
})

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        // if login in successfull then what to ds
        builder
        .addCase(createAccount.fulfilled,(state,action)=>{
            console.log('in create account',action);
            localStorage.setItem("data",action?.payload?.user)
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("UserId",action?.payload?.user?._id)
            localStorage.setItem("role",action?.payload?.user?.role)
            state.isLoggedIn=true
            state.data=action?.payload?.user
            state.UserId=action?.payload?.user?._id
            state.role=action?.payload?.user?.role
        })
        .addCase(login.fulfilled,(state,action)=>{
            // setting the data in the form of string 
            // we have stored in local storage because
            // statte will be fetched from local storage
            // current state will not be accessed from the local storage thatswhy we have saved in the state
            localStorage.setItem("data",action?.payload?.user)
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("UserId",action?.payload?.user?._id)
            localStorage.setItem("role",action?.payload?.user?.role)
            state.isLoggedIn=true
            state.data=action?.payload?.user
            state.UserId=action?.payload?.user?._id
            state.role=action?.payload?.user?.role
        })
        .addCase(Logout.fulfilled,(state)=>{
            localStorage.clear();
            state.data={}
            state.isLoggedIn=false
            state.role=""
        })

        // .addCase(getUserData.fulfilled,(state,action)=>{
        //     if(!action?.payload?.user) return
        //     localStorage.setItem("data",JSON.stringify(action?.payload?.user))
        //     localStorage.setItem("isLoggedIn",true)
        //     localStorage.setItem("role",action?.payload?.user?.role)
        //     state.isLoggedIn=true
        //     state.data=action?.payload?.user
        //     state.role=action?.payload?.user?.role
        // })
    }
})

// export const {}=authSlice.actions
export default authSlice.reducer