import React, { useMemo, useState } from 'react'
import { Row, Table, Layout, Button } from 'antd'
import { useContextDispatch } from '../../../../../contexts/AgentContext'
import { v4 as uuidv4 } from 'uuid'

import AddEntity from './AddEntity'
import EditEntity from './EditEntity'

const { Content } = Layout

const columns = [
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Descrição',
    dataIndex: 'description',
    key: 'description',
  },
]

export function Entity({ entities, agentKey }) {
  const dispatch = useContextDispatch()

  const [showAddEntityModal, setShowAddEntityModal] = useState(false)
  const [editEntityModalParams, setShowEditEntityModal] = useState({ visible: false, data: null })

  const closeModal = () => setShowAddEntityModal(false)
  const closeEditModal = () => setShowEditEntityModal({ visible: false, data: null })

  const handleAddEntity = ({ name, description }) => {
    const newEntities = [
      {
        name,
        description,
        key: uuidv4(),
      },
      ...entities,
    ]

    dispatch({
      type: 'UPDATE_AGENT_ENTITIES',
      payload: {
        agentKey,
        newEntities,
      },
    })
  }

  const handleEditIntent = (data) => {
    const { key } = data

    const newEntities = entities.map((entity) => {
      if (entity.key === key) {
        return {
          ...entity,
          ...data,
        }
      }
      return entity
    })

    dispatch({
      type: 'UPDATE_AGENT_ENTITIES',
      payload: {
        agentKey,
        newEntities,
      },
    })
  }

  const TableColumns = useMemo(() => {
    return [
      ...columns,
      {
        title: '',
        render: (data) => (
          <Button type="secondary" onClick={() => setShowEditEntityModal({ visible: true, data })}>
            Editar
          </Button>
        ),
      },
    ]
  }, [])

  return (
    <Content>
      <Row style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={() => setShowAddEntityModal(true)}>
          Adicionar Entidade
        </Button>
      </Row>

      <Table columns={TableColumns} dataSource={entities} />

      <AddEntity onSave={handleAddEntity} onCancel={closeModal} visible={showAddEntityModal} />

      <EditEntity onSave={handleEditIntent} onCancel={closeEditModal} {...editEntityModalParams} />
    </Content>
  )
}
