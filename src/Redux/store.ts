import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import bookReducer from './slices';
import {configureStore} from '@reduxjs/toolkit';

const persistSettings = {
  key: 'VIRTUAL_LIBRARY',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistSettings, bookReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

export const persistor = persistStore(store);
