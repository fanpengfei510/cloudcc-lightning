import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/index';
import { AppContainer } from 'react-hot-loader';
// AppContainer 是一个 HMR 必须的包裹(wrapper)组件

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// 模块热替换的 API
if (module.hot) {
  module.hot.accept('./component/index', () => {
    render(App)
  });
}