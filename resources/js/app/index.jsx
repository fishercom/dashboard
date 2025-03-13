import React from 'react'
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'

import { store } from '../_helpers';
import App from './app'

if(document.getElementById('app')){
    createRoot(document.getElementById('app')).render(<Provider store={store}>
        <App />
    </Provider>)
}

