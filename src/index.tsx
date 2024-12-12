import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import {GoogleOAuthProvider} from "@react-oauth/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorBoundary from "./components/error-boundary/ErrorBoundary";


ReactDOM.render(
    <GoogleOAuthProvider clientId="510644109835-2cmcgd431ia2uhbhdv4suitadmgih8vp.apps.googleusercontent.com">
        <ErrorBoundary>
            <App />
        </ErrorBoundary>,
    </GoogleOAuthProvider>
    , document.getElementById('root'));
