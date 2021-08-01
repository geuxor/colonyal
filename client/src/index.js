import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { authReducer } from './reducers/auth';

//create redux store
const Store = createStore(authReducer, composeWithDevTools())
// const { user }: { user: State } = useSelector((state: any) => state.user);
//provide redux store   to the whole app
ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
