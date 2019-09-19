import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

import './index.css';
import App from './App';
import store from './store/index';
import registerServiceWorker from './registerServiceWorker';

render(
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>,

    document.getElementById('root')
);
registerServiceWorker();
