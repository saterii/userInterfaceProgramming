import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import itemReducer from "./itemsSlice";
import reducer from './cartSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
  reducer:{
  items: itemReducer,
  cartItems: reducer,
  }
});

root.render(
  
  <Provider store={store}>
    
    <App/>
    
  </Provider>
  
);

