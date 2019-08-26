import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import './index.css';
import App from './App';
import store from './store/index';
import registerServiceWorker from './registerServiceWorker';

const options = {
    timeout: 5000
}

render(
    <ReduxProvider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
            <App />
        </AlertProvider>
    </ReduxProvider>,

    document.getElementById('root')
);
registerServiceWorker();
