import React from 'react';
import ReactDOM from 'react-dom';
import './style/custom.css';
import PinStatus from './components/PinStatus/pinStatus';
import * as serviceWorker from './serviceWorker';
ReactDOM.render(<PinStatus />, document.getElementById('root'));
serviceWorker.unregister();
