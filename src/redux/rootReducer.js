import { combineReducers } from '@reduxjs/toolkit'
import cellStateReducer from './slice.js' // Assuming you have a userSlice


const rootReducer = combineReducers({
    cellState: cellStateReducer,
    // Add other slices here
})

export default rootReducer