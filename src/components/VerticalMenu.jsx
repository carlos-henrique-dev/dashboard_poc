import { Menu, Layout, Row, Avatar, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined, RobotOutlined,DashboardOutlined } from '@ant-design/icons'

const { Sider } = Layout
const { Text } = Typography

function VerticalMenu() {
  return (
    <Sider>
      <Row gutter={[16, 16]} className="menu-header">
        <Avatar size={34} icon={<UserOutlined />} />
        <Text level={5} className="username">
          Usuário Logado
        </Text>
      </Row>
      <Menu theme="dark" defaultSelectedKeys="1">
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<RobotOutlined />}>
          <Link to="/agent">Agente</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default VerticalMenu
