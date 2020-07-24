import React from 'react';
import ReactDOM from 'react-dom';
import 'react-reflex/styles.css'
import {App} from './App';
import * as serviceWorker from './serviceWorker';
import {FocusStyleManager} from "@blueprintjs/core";
import store from "./redux/store";
import {Provider} from "react-redux";

FocusStyleManager.onlyShowFocusOnTabs();


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)

serviceWorker.unregister();
