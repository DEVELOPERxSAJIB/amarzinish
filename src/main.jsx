import React from "react";
import App from "./App.jsx";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import 'swiper/css';
import { Provider } from "react-redux";
import { store } from './app/store';
import  ReactDOM  from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
