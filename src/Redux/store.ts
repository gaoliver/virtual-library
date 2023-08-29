import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import bookReducer from './slices';
import {configureStore} from '@reduxjs/toolkit';

const persistSettings = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['settings'],
};

export const store = configureStore({
  reducer: persistReducer(persistSettings, bookReducer),
});

export const persistor = persistStore(store);
