import { createSlice } from '@reduxjs/toolkit'
import _ from 'lodash';

const initialState = {
    user: {},
    searchTermList: []
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        saveSearchTerm: (state, action) => {
            const previousItems = !_.isEmpty(state.searchTermList) ? state.searchTermList.slice() : [];
            const filteredArray = previousItems.filter(item => item.term !== action.payload.term)
            filteredArray.unshift(action.payload)
            if (_.size(filteredArray) > 5) filteredArray.pop()
            state.searchTermList = filteredArray
        },
        setUserData: (state, action) => {
            state.user = action.payload
        },
        userLogout: (state) => {
            state.user = {}
        }
    },
})

// Action creators are generated for each case reducer function
export const { saveSearchTerm, setUserData, userLogout } = appSlice.actions

export default appSlice.reducer