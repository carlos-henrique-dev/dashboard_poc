import React, { useEffect, useState } from 'react'
import { Modal, Input, Row } from 'antd'

function EditEntity({ visible, onSave, onCancel, data }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (data) {
      const { name, description } = data

      setName(name)
      setDescription(description)
    }
  }, [data])

  const handleSave = () => {
    onSave({ ...data, name, description })
    setName('')
    setDescription('')
    onCancel()
  }

  const handleNameChange = (event) => setName(event.target.value)
  const handleDescriptionChange = (event) => setDescription(event.target.value)

  return (
    <Modal
      centered
      title="Editar entidade"
      visible={visible}
      onOk={handleSave}
      onCancel={onCancel}
      okButtonProps={{
        disabled: name.trim() === '',
        title: 'Salvar',
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

export default EditEntity
