import React from 'react'
import ReactDOM from 'react-dom'
import '~/style/global.scss'
import './index.scss'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import Tabs from './Tabs'

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
    <Tabs />
  </React.StrictMode>,
  document.getElementById('service-tabs')
)
