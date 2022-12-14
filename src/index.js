import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './Page/Main';
import reportWebVitals from './reportWebVitals';
import store,{history} from './Config/Redux/store'
import { ConnectedRouter } from 'connected-react-router';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <ConnectedRouter history={history}>
    <App />
    </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
