import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    adminData: {},
    token:null,
    isLoggedIn:false
}

const adminSlice = createSlice({
    name:'admin',
    initialState,
    reducers:{
        setAdminData:(state,action)=>{
            state.adminData=action.payload.adminData
            state.token=action.payload.token
            state.isLoggedIn=true
        },
        logout:(state)=>{
            state.adminData=null
            state.token=null
            state.isLoggedIn=false
        }
    }
})
export const {setAdminData,logout} = adminSlice.actions
export default adminSlice.reducer