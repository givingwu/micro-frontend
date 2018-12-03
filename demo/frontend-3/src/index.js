import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import microfe from '../../../lib';

console.log(microfe)

const host = microfe.createHost()
const app = {
  path: '/react-demo',
  render() {
    ReactDOM.render(<App />, document.getElementById('app'));
  }
}

host.createApp(app)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

export default app;