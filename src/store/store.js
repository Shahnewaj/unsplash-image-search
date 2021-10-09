import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import appSlice from './slice/appSlice';

const reducers = combineReducers({
    app: appSlice
});

const persistConfig = {
    timeout: 100,
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);


const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
    devTools: true

});

export default store;