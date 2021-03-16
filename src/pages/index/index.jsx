import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.less';
import '~/style/index.css'
import '~/style/index.scss'
import './index.scss'
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import Jumbotron from './Jumbotron'
import Photo from './Photo'

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

ReactDOM.render(
  <React.StrictMode>
    <Photo />
  </React.StrictMode>,
  document.getElementById('photo')
)



