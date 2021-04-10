import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import UserInfo from '~/components/UserInfo'
import 'antd/dist/antd.less'
import '~/style/index.css'
import './index.scss'
import Bouncing from '~/components/Bouncing'
const App = lazy(() => import('./App'))
const Photo = lazy(() => import('~/pages/index/Photo'))

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Bouncing />}>
      <UserInfo />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('user-info')
)

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Bouncing />}>
      <Photo />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('photo')
)

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<Bouncing />}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('game-support')
)


