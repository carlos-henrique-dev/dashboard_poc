import React, { useEffect, useState } from 'react'
import { Modal, Input } from 'antd'

function AddNode({ visible, onSave, onCancel, data }) {
  const [title, setTitle] = useState('')

  useEffect(() => {
    if (data) {
      const { title } = data

      setTitle(title)
    }
  }, [data])

  const handleSave = () => {
    onSave({ ...data, title })
    setTitle('')
    onCancel()
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  return (
    <Modal
      centered
      title="Editar nó"
      visible={visible}
      onOk={handleSave}
      onCancel={onCancel}
      okButtonProps={{
        disabled: title.trim() === '',
        title: 'Salvar',
      }}
    >
      <Input placeholder="Título do nó" value={title} onChange={handleTitleChange} />
    </Modal>
  )
}

export default AddNode
