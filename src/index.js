import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import { BrowserRouter } from 'react-router-dom'
import BaseLayout from './components/BaseLayout'

import './styles/index.less'
import { AgentContext } from './contexts/AgentContext'

ReactDOM.render(
  <React.StrictMode>
    <AgentContext>
      <BrowserRouter>
        <BaseLayout>
          <Routes />
        </BaseLayout>
      </BrowserRouter>
    </AgentContext>
  </React.StrictMode>,
  document.getElementById('root')
)
