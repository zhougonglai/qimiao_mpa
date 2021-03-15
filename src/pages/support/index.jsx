import React from 'react'
import ReactDOM from 'react-dom'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import '~/style/index.css'
import '~/style/index.scss'
import './index.scss'
import App from './App'
import Photo from '../index/Photo'

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

ReactDOM.render(
  <React.StrictMode>
    <Photo />
  </React.StrictMode>,
  document.getElementById('photo')
)



