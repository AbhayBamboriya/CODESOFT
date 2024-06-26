import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import  axiosInstance  from "../../Helpers/axiosInstance";

const initialState={
    isLoggedIn:localStorage.getItem('isLoggedIn') || '',
    id:localStorage.getItem('id')   || '',

    role:localStorage.getItem('role') || '',

}  

export const createAccount=createAsyncThunk('/auth/signup',async(data) =>{
    try{
        console.log('data to be send',data);
        const res=axiosInstance.post("/register",data)
        console.log('res'+res);
        toast.promise(res
            // ,console.log('ressss'+res).toString()
            ,{
            loading:"Wait! Creating your account",
            
            success:(data)=>{
                return data?.data?.message
            },
            // error:"Failed to create account"
            // error: (err) => {
            //     console.error('Failed to create account:', err);
            //     return "Failed to create account";
            // }
            // console.log();
        });
        console.log('checking response in frontend',res);
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})

export const login=createAsyncThunk('/auth/login',async(data) =>{
    try{
        console.log('check',data.email," ",data);
        const res= axiosInstance.post('/login',data)
        toast.promise(res,{
            loading:"Wait! Authentication in Progress ",
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to Login"
        });
        return (await (res)).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})


export const logout = createAsyncThunk("/auth/logout",async ()=>{
    try{
        const res=axiosInstance.get("/logout")
        console.log('res'+(await res).data);
        toast.promise(res,{
            loading:"Wait! Logout in Progress ",
            
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to Logout"
        });
        // console.log('check');
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})

export const updateProfile = createAsyncThunk("/user/update/profile",async (data)=>{
    try{
        const res=axiosInstance.put(`user/update/${data[0]}`,data[1])
        toast.promise(res,{
            loading:"Wait! Profile Update in Progress ",
            
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to Update Profile"
        });
        // console.log('check');
        return (await res).data
    }
    catch(e){
        toast.error(e?.response?.data?.message)
    }
})

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
        .addCase(login.fulfilled,(state,action)=>{
            // setting the data in the form of string 
            // we have stored in local storage because
            // statte will be fetched from local storage
            // current state will not be accessed from the local storage thatswhy we have saved in the state
            console.log('in loginchekinnnn',action);
            localStorage.setItem("data",action?.payload?.user)
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("id",action?.payload?.user._id)
            localStorage.setItem("role",action?.payload?.user?.role)
            state.isLoggedIn=true
            state.data=action?.payload?.user
            state.id=action?.payload?.user?._id
            console.log('inlocat storage',localStorage," ",localStorage.role);
            state.role=localStorage.role
        })
        .addCase(logout.fulfilled,(state)=>{
            localStorage.clear();
            state.data={}
            state.isLoggedIn=false
            state.id=""
            state.role=""
        })

        .addCase(getUserData.fulfilled,(state,action)=>{
            if(!action?.payload?.user) return
            localStorage.setItem("data",JSON.stringify(action?.payload?.user))
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("role",action?.payload?.user?.role)
            state.isLoggedIn=true
            state.data=action?.payload?.user
            state.role=action?.payload?.user?.role
        })
    }
})

// export const {}=authSlice.actions
export default authSlice.reducer