import React from 'react'
import ReactDOM from 'react-dom'
import '~/style/global.scss'
import './index.scss'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import Jumbotron from './Jumbotron';

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
    <Jumbotron />
  </React.StrictMode>,
  document.getElementById('jumbotron')
)



