import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    routeData: {},
}

const routeSlice = createSlice({
    name:'route',
    initialState,
    reducers:{
        setRouteData:(state,action)=>{
            state.routeData=action.payload.routeData
        },
        logout:(state)=>{
            state.routeData=null
        }
    }
})
export const {setRouteData,logout} = routeSlice.actions
export default routeSlice.reducer