import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/feed.css';
import './styles/endvr.css';
import './styles/assistant.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './app';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
