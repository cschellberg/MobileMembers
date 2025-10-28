import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    token: null,
}

const cellStateSlice = createSlice({
    name: 'cellState',
    initialState,
    reducers: {
        updateToken: (state, action) => {
            state.token=action.payload;
        },
        logout: (state,action) => {
            state.token=null;
        }
    },
})

export const { updateToken,logout } = cellStateSlice.actions

export const getToken = (state) => state.cellState.token;

export default cellStateSlice.reducer

