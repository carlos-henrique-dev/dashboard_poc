import React, { useState } from 'react'
import { Modal, Input, Row } from 'antd'

function AddEntity({ visible, onSave, onCancel }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const handleSave = () => {
    onSave({ name, description })
    setName('')
    setDescription('')
    onCancel()
  }

  const handleNameChange = (event) => setName(event.target.value)
  const handleDescriptionChange = (event) => setDescription(event.target.value)

  return (
    <Modal
      centered
      title="Adicionar Entidade"
      visible={visible}
      onOk={handleSave}
      onCancel={onCancel}
      okButtonProps={{
        disabled: name.trim() === '',
        title: 'Adicionar',
      }}
    >
      <Row style={{ marginBottom: 5 }}>
        <Input placeholder="Nome da entidade" value={name} onChange={handleNameChange} />
      </Row>

      <Row style={{ marginBottom: 5 }}>
        <Input placeholder="Descrição da entidade" value={description} onChange={handleDescriptionChange} />
      </Row>
    </Modal>
  )
}

export default AddEntity
