import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import { store } from './app/store';
import { Provider } from 'react-redux';

import './stylesheets/index.css';
import Play from './pages/Play';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import reportWebVitals from './extras/reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>

  },
  {
    path: "/main",
    element: <Home/>
  },
  {
    path: "/play",
    element: <Play/>

  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    //<App />
    <Provider store ={store}>
      <RouterProvider router={router} />
    </Provider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
