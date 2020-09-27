import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import {Provider} from "react-redux";
import {store,persistor} from "./redux/store";
import {PersistGate} from "redux-persist/integration/react";


ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
           <Routes />
        </PersistGate>
    </Provider>
    , document.getElementById('root')
);