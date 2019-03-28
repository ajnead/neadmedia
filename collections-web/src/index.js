import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './app.js';
import registerServiceWorker from './registerServiceWorker.js';
import { runWithAdal } from 'react-adal';
import { authContext } from './configs/adalConfig';

const DO_NOT_LOGIN = false;

runWithAdal(authContext, () => {
    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    ,document.getElementById('root'))
},DO_NOT_LOGIN)
registerServiceWorker();
