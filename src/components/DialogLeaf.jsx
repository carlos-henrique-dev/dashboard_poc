import React from 'react'
import { Layout, Row, Typography, Menu, Dropdown, Space, Modal } from 'antd'
import { EditOutlined, SettingOutlined, ArrowUpOutlined, ArrowDownOutlined, DeleteOutlined, ExclamationCircleOutlined, SubnodeOutlined } from '@ant-design/icons'

const { confirm } = Modal

const { Content } = Layout
const { Text } = Typography

function DialogLeaf({ data, addNode, editNode, removeNode, parentKey }) {
  const { title, key } = data

  const handleAddNode = (position) => addNode(key, position, parentKey)

  const handleEditNode = () => editNode(data)

  const showConfirmDelete = () => {
    confirm({
      title: 'Deseja mesmo remover este nó?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Sim',
      cancelText: 'Não',
      onOk() {
        removeNode(key)
      },
      centered: true,
    })
  }

  const menu = (
    <Menu>
      <Menu.Item key="0" icon={<ArrowUpOutlined />} onClick={() => handleAddNode('above')}>
        <Text>Adicionar nó acima</Text>
      </Menu.Item>
      <Menu.Item key="1" icon={<ArrowDownOutlined />} onClick={() => handleAddNode('below')}>
        <Text>Adicionar nó abaixo</Text>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" icon={<SubnodeOutlined />} onClick={() => handleAddNode('inner')}>
        <Text>Adicionar sub-nó</Text>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" icon={<DeleteOutlined />} onClick={showConfirmDelete}>
        <Text>Remover nó</Text>
      </Menu.Item>
    </Menu>
  )

  return (
    <Content className="leaf">
      <Row>
        <Space direction="vertical" size={1}>
          <Text className="name" strong>
            {title}
          </Text>
          <Text className="key" type="secondary">
            Chave: {key}
          </Text>
        </Space>

        <Space direction="vertical" className="actions">
          <EditOutlined className="leaf-action" onClick={handleEditNode} />

          <Dropdown overlay={menu} trigger={['click']}>
            <SettingOutlined className="leaf-action" />
          </Dropdown>
        </Space>
      </Row>
    </Content>
  )
}

export default DialogLeaf
