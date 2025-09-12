import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from "react-redux";
import {store,persistor} from "./State/store/Store.tsx"
import { PersistGate } from 'redux-persist/integration/react';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      
    <App />
    <PersistGate loading={null} persistor={persistor}>
    </PersistGate>
    </Provider>
  </StrictMode>,
)
