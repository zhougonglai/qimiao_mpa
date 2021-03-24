import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.less'
import '~/style/index.css'
import './index.scss'
import UserInfo from '~/components/UserInfo'
import HelpBar from '~/components/HelpBar'

ReactDOM.render(
  <React.StrictMode>
    <UserInfo />
  </React.StrictMode>,
  document.getElementById('user-info')
)

const helpBar = document.getElementById('help-bar')

ReactDOM.render(
  <React.StrictMode>
    <HelpBar position={helpBar.getAttribute('position')}/>
  </React.StrictMode>,
  helpBar
)

