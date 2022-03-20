import React, { useMemo, useState } from 'react'
import { Row, Table, Layout, Button } from 'antd'
import AddIntent from './AddIntent'
import EditIntent from './EditIntent'
import { useContextDispatch } from '../../../../../contexts/AgentContext'
import { v4 as uuidv4 } from 'uuid'

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

export function Intent({ intents, agentKey }) {
  const dispatch = useContextDispatch()

  const [showAddIntentModal, setShowAddIntentModal] = useState(false)
  const [editIntentModalParams, setShowEditIntentModal] = useState({ visible: false, data: null })

  const closeModal = () => setShowAddIntentModal(false)
  const closeEditModal = () => setShowEditIntentModal({ visible: false, data: null })

  const handleAddIntent = ({ name, description }) => {
    const newIntents = [
      {
        name,
        description,
        key: uuidv4(),
      },
      ...intents,
    ]

    dispatch({
      type: 'UPDATE_AGENT_INTENTS',
      payload: {
        agentKey,
        newIntents,
      },
    })
  }

  const handleEditIntent = (data) => {
    const { key } = data

    const newIntents = intents.map((intent) => {
      if (intent.key === key) {
        return {
          ...intent,
          ...data,
        }
      }
      return intent
    })

    dispatch({
      type: 'UPDATE_AGENT_INTENTS',
      payload: {
        agentKey,
        newIntents,
      },
    })
  }

  const TableColumns = useMemo(() => {
    return [
      ...columns,
      {
        title: '',
        render: (data) => (
          <Button type="secondary" onClick={() => setShowEditIntentModal({ visible: true, data })}>
            Editar
          </Button>
        ),
      },
    ]
  }, [])

  return (
    <Content>
      <Row style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={() => setShowAddIntentModal(true)}>
          Adicionar Intenção
        </Button>
      </Row>

      <Table columns={TableColumns} dataSource={intents} />

      <AddIntent onSave={handleAddIntent} onCancel={closeModal} visible={showAddIntentModal} />

      <EditIntent onSave={handleEditIntent} onCancel={closeEditModal} {...editIntentModalParams} />
    </Content>
  )
}
