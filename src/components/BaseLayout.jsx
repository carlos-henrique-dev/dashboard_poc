import { Layout, Typography } from 'antd'
import React from 'react'
import VerticalMenu from './VerticalMenu'

const { Header, Content } = Layout
const { Text } = Typography

function BaseLayout({ children }) {
  return (
    <Layout style={{ height: '100vh' }}>
      <VerticalMenu />
      <Layout className="app-layout">
        <Header>
          <Text className="header-text">Painel Administrativo Sinapse</Text>
        </Header>
        <Content className="app-content">{children}</Content>
      </Layout>
    </Layout>
  )
}

export default BaseLayout
