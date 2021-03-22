import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.less';
import '~/style/index.css'
import '~/style/index.scss'
import './index.scss'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <Header />
  </React.StrictMode>,
  document.getElementById('header')
)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('download')
)
