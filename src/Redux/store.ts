import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import bookReducer from './slices';
import {configureStore} from '@reduxjs/toolkit';

const persistSettings = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['settings'],
};

const store = configureStore({
  reducer: persistReducer(persistSettings, bookReducer),
});

const persistor = persistStore(store);

export {store, persistor};
