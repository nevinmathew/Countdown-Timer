// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import './index.css'
// import Countdown from './countdown'
// // import Countdown from './App.jsx'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Countdown />
//   </React.StrictMode>,
// )

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import Countdown from './countdown';
// import RecaptchaV2 from './captcha';


ReactDOM.createRoot(document.getElementById('root'))
.render(
  <Provider store={store}>
    <Countdown />
    {/* <RecaptchaV2 /> */}
  </Provider>,  
);
