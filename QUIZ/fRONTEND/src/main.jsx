import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
// import store from '/Redux/Slices/store.js'
import { Provider } from 'react-redux'
import store from '../Redux/Slices/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
        <ToastContainer />  
      </React.StrictMode>,
    </BrowserRouter>

  </Provider>
)
