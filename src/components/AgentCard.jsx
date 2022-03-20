import React from 'react'
import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Meta } = Card

function AgentCard({ data }) {
  const { name, description, image } = data

  const EditAgent = () => (
    <Link to={`/agent/manage/${data.key}`}>
      <EditOutlined key="edit" />
    </Link>
  )

  return (
    <Card style={{ width: 200 }} cover={<img alt="example" src={image} width="100" height="100" style={{ objectFit: 'cover' }} />} actions={[<EditAgent />]}>
      <Meta title={name} description={description} />
    </Card>
  )
}

export default AgentCard
