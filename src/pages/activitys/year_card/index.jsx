import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.less';
import '~/style/index.css'
import './index.scss'
import '~/style/activity.scss'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
)
