import React, { useState } from 'react'
import { Modal, Input } from 'antd'

function AddNode({ visible, onSave, onCancel }) {
  const [title, setTitle] = useState('')

  const handleSave = () => {
    onSave(title)
    setTitle('')
    onCancel()
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  return (
    <Modal
      centered
      title="Adicionar nó"
      visible={visible}
      onOk={handleSave}
      onCancel={onCancel}
      okButtonProps={{
        disabled: title.trim() === '',
        title: 'Adicionar',
      }}
    >
      <Input placeholder="Título do nó" value={title} onChange={handleTitleChange} />
    </Modal>
  )
}

export default AddNode
