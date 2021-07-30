import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { createStore } from 'redux'
import { Provider } from 'react-redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import rootReducer from './reducers';

//create redux store
// const store = createStore(rootReducer, composeWithDevTools())

//provide redux store   to the whole app
ReactDOM.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
