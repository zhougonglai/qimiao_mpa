import React from 'react'
import ReactDOM from 'react-dom'
import '~/style/header.scss'
import '~/style/global.scss'
import '~/style/footer.scss'
import './index.scss'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('game-support')
)
