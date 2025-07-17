// src/redux/rootReducer.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

import authReducer from './slices/authSlice';
import counterReducer from './slices/counterSlice';

// Config: only persist auth
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer), // persisted
  counter: counterReducer, // not persisted
});

export default rootReducer;
