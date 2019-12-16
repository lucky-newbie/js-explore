import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from 'redux/store.js';

import App from './container/App';


// ReactDOM.render(<App />, document.getElementById('root'));

const Entry = () => {
  return <Provider store={store}><App /></Provider>
}

ReactDOM.render(<Entry />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('index.js', () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('root'))
  })
}