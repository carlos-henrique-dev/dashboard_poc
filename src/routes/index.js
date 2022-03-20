import { Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import Agent from '../pages/agent'
import ManageAgent from '../pages/agent/manage'

const routes = [
  {
    key: 'dashboard',
    path: '/',
    element: <Dashboard />,
  },
  {
    key: 'agent',
    path: 'agent',
    element: <Agent />,
  },
  {
    key: 'manage-agent',
    path: 'agent/manage/:agentKey',
    element: <ManageAgent />,
  },
]

function Router() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.key} path={route.path} element={route.element} />
      ))}
    </Routes>
  )
}

export default Router
