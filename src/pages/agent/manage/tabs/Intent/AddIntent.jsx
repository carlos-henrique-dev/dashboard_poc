import React, { useState } from 'react'
import { Modal, Input, Row } from 'antd'

function AddIntent({ visible, onSave, onCancel }) {
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
      title="Adicionar intenção"
      visible={visible}
      onOk={handleSave}
      onCancel={onCancel}
      okButtonProps={{
        disabled: name.trim() === '',
        title: 'Adicionar',
      }}
    >
      <Row style={{ marginBottom: 5 }}>
        <Input placeholder="Nome da intenção" value={name} onChange={handleNameChange} />
      </Row>

      <Row style={{ marginBottom: 5 }}>
        <Input placeholder="Descrição da intenção" value={description} onChange={handleDescriptionChange} />
      </Row>
    </Modal>
  )
}

export default AddIntent
