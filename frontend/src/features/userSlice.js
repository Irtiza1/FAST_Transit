import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    data: {},
    token:null,
    isLoggedIn:false
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setData:(state,action)=>{
            state.data=action.payload.data
            state.token=action.payload.token
            state.isLoggedIn=true
        },
        logout:(state)=>{
            state.data=null
            state.token=null
            state.isLoggedIn=false
        }
    }
})
export const {setData,logout} = userSlice.actions
export default userSlice.reducer