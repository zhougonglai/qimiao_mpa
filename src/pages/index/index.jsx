import React from 'react'
import ReactDOM from 'react-dom'
import '~/style/global.scss'
import './index.scss'
import Header from '~/components/Header'
import Footer from '~/components/Footer'

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
