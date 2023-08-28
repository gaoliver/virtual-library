import {applyMiddleware, legacy_createStore as createStore, Store} from 'redux';
import thunk from 'redux-thunk';
import {appReducer} from './reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

const persistSettings = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['settings'],
};

const reducer = persistReducer(persistSettings, appReducer);

const store: Store<AppState> = createStore(reducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export type AppState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export {store, persistor};
