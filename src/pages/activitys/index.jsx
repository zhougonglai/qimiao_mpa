import React from 'react'
import ReactDOM from 'react-dom'
import ActivityHeader from '~/components/ActivityHeader'
import App from './App'
import '~/style/activity.scss'
import './index.scss'

ReactDOM.render(
  <React.StrictMode>
    <ActivityHeader />
    <App />
  </React.StrictMode>,
  document.getElementById('app')
)
