import React from 'react'
import ReactDOM from 'react-dom'
import '~/style/global.scss'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
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
    <Header />
  </React.StrictMode>,
  document.getElementById('header')
)

ReactDOM.render(
  <React.StrictMode>
    <Footer />
  </React.StrictMode>,
  document.getElementById('footer')
)
