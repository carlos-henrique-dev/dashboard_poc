import React, { useCallback } from 'react'
import { Layout, Divider, Row, Typography, Col } from 'antd'
import { useContextState } from '../../contexts/AgentContext'
import AgentCard from '../../components/AgentCard'

const { Content } = Layout
const { Title } = Typography

function Agent() {
  const { agents } = useContextState()

  const renderAgents = useCallback(() => {
    return agents.map((agent, index) => (
      <Col key={index}>
        <AgentCard data={agent} />
      </Col>
    ))
  }, [agents])

  return (
    <Content>
      <Row>
        <Title level={4}>Agentes</Title>
      </Row>
      <Divider />

      <Row gutter={[16, 16]}>{renderAgents()}</Row>
    </Content>
  )
}

export default Agent
