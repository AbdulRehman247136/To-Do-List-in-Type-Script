import { combineReducers, configureStore} from "@reduxjs/toolkit";
import { authReducer } from "../tokenslice/TokenSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import type { Reducer } from "redux";




const persistConfig = {
    key:"root",
    storage,
    whitelist:["auth"] 
}
const rootReducer = combineReducers({
    auth: authReducer,
   
  });


  const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer as Reducer);


export const store = configureStore({
    reducer: persistedReducer,
   
  });

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;