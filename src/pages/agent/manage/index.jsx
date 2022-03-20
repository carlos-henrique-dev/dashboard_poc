import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Tabs, PageHeader, Layout } from 'antd'
import { useContextState } from '../../../contexts/AgentContext'
import { Entity, Dialog, Intent } from './tabs'

const { TabPane } = Tabs
const { Content } = Layout

function Agent() {
  const navigate = useNavigate()
  const params = useParams()
  const { agentKey } = params

  const { agents } = useContextState()

  const [agent, setAgent] = useState({})

  useEffect(() => {
    const findAgent = agents.find((agent) => agent.key === agentKey) || {}

    setAgent(findAgent)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentKey, agents])

  return (
    <Content className='manage-agent'>
      <PageHeader onBack={() => navigate('/agent')} title="Gerenciamento de agente" subTitle="Crie ou edite agentes" className='agent-header' />

      <Tabs defaultActiveKey="1" className='agent-tabs'>
        <TabPane tab="Intenções" key="1">
          <Intent intents={agent.intents} agentKey={agentKey} />
        </TabPane>
        <TabPane tab="Diálogos" key="2">
          <Dialog dialogs={agent.dialogs} agentKey={agentKey} />
        </TabPane>
        <TabPane tab="Entidades" key="3">
          <Entity entities={agent.entities} agentKey={agentKey} />
        </TabPane>
      </Tabs>
    </Content>
  )
}

export default Agent
