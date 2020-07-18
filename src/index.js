import React from 'react';
import ReactDOM from 'react-dom';
import 'react-reflex/styles.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import {FocusStyleManager} from "@blueprintjs/core";

FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
