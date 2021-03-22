import React from 'react'
import ReactDOM from 'react-dom'
import UserInfo from '~/components/UserInfo'
import Photo from '~/pages/index/Photo'
import 'antd/dist/antd.less'
import '~/style/index.css'
import '~/style/index.scss'
import './index.scss'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('game-support')
)

ReactDOM.render(
  <React.StrictMode>
    <UserInfo />
  </React.StrictMode>,
  document.getElementById('user-info')
)

ReactDOM.render(
  <React.StrictMode>
    <Photo />
  </React.StrictMode>,
  document.getElementById('photo')
)



