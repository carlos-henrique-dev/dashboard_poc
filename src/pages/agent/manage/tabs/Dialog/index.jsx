import React, { useEffect, useState } from 'react'
import { Tree, Layout, Row, Button, Divider, Typography } from 'antd'
import DialogLeaf from '../../../../../components/DialogLeaf'
import { useContextDispatch } from '../../../../../contexts/AgentContext'
import { v4 as uuidv4 } from 'uuid'

import AddNode from './AddNode'
import EditNode from './EditNode'
import AddDialog from './AddDialog'
import { deepSearch, addChildToParent, addChildToNode, deleteNode, updateNode } from './helpers'

const { Content } = Layout
const { Title } = Typography

export function Dialog({ dialogs, agentKey }) {
  const dispatch = useContextDispatch()

  const [treeData, setTreeData] = useState([])
  const [showAddNodeModal, setShowAddNodeModal] = useState(false)
  const [editNodeModalParams, setShowEditNodeModal] = useState({ visible: false, data: null })
  const [showAddDialogModal, setShowAddDialogModal] = useState(false)

  const [newNodeInfo, setNewNodeInfo] = useState({
    position: 'below', // above | below | inner
    currentLeafKey: null,
    parentKey: null,
  })

  const closeModal = () => setShowAddNodeModal(false)
  const closeEditModal = () => setShowEditNodeModal({ visible: false, data: null })
  const closeAddDialogModal = () => setShowAddDialogModal(false)

  const handleAddNode = (newNode) => {
    if (!dialogs.length) {
      dispatch({
        type: 'UPDATE_AGENT_DIALOG',
        payload: {
          agentKey,
          newAgentDialogs: [
            {
              key: uuidv4(),
              title: newNode,
            },
          ],
        },
      })

      return
    }

    const { position, currentLeafKey, parentKey } = newNodeInfo

    let currentNode = null

    deepSearch(dialogs, currentLeafKey, (currNode) => {
      currentNode = currNode
    })

    if (!currentNode) {
      currentNode = dialogs[dialogs.length - 1]
    }

    let updatedTree = null

    switch (position) {
      case 'above':
      case 'below': {
        updatedTree = addChildToParent(dialogs, currentNode.key, parentKey, { title: newNode }, position)
        break
      }
      default: {
        updatedTree = addChildToNode(dialogs, currentNode.key, { title: newNode })
      }
    }

    dispatch({
      type: 'UPDATE_AGENT_DIALOG',
      payload: {
        agentKey,
        newAgentDialogs: updatedTree,
      },
    })
  }

  const handleRemoveNode = (key) => {
    let currentNode = null

    deepSearch(dialogs, key, (currNode) => {
      currentNode = currNode
    })

    const updatedTree = deleteNode(dialogs, currentNode.key)

    dispatch({
      type: 'UPDATE_AGENT_DIALOG',
      payload: {
        agentKey,
        newAgentDialogs: updatedTree,
      },
    })
  }

  const handleEditNode = (node) => {
    const { key } = node

    let currentNode = null

    deepSearch(dialogs, key, (currNode) => {
      currentNode = currNode
    })

    const updatedTree = updateNode(dialogs, currentNode.key, node)

    dispatch({
      type: 'UPDATE_AGENT_DIALOG',
      payload: {
        agentKey,
        newAgentDialogs: updatedTree,
      },
    })
  }

  const handleOpenNewNodeModal = (key = null, position = 'below', parentKey = null) => {
    setNewNodeInfo({
      parentKey,
      currentLeafKey: key,
      position,
    })

    setShowAddNodeModal(true)
  }

  const handleOpenEditNodeModal = (data) => {
    setShowEditNodeModal({
      visible: true,
      data,
    })
  }

  const formatTreeData = (node, _, __, parentKey = null) => {
    const { children, key, ...rest } = node

    const data = {
      ...rest,
      key,
      title: <DialogLeaf data={node} addNode={handleOpenNewNodeModal} editNode={handleOpenEditNodeModal} removeNode={handleRemoveNode} parentKey={parentKey} />,
      selectable: false,
      isLeaf: true,
    }

    if (children) {
      data.children = children.map((node, index, origin) => formatTreeData(node, index, origin, key))
      data.isLeaf = false
    }

    return data
  }

  useEffect(() => {
    const result = dialogs.map(formatTreeData)
    setTreeData(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dialogs])

  return (
    <Content>
      <Row style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={() => setShowAddDialogModal(true)}>
          Adicionar Diálogo
        </Button>
      </Row>

      <Divider />

      <Content>
        <Row style={{ marginBottom: 10 }}>
          <Title level={4}>Árvore de diálogos do agente</Title>
        </Row>

        <Tree showLine={{ showLeafIcon: false }} showIcon treeData={treeData} defaultExpandAll autoExpandParent />
      </Content>

      <AddNode visible={showAddNodeModal} onSave={handleAddNode} onCancel={closeModal} />

      <EditNode {...editNodeModalParams} onSave={handleEditNode} onCancel={closeEditModal} />

      <AddDialog visible={showAddDialogModal} onSave={handleAddNode} onCancel={closeAddDialogModal} />
    </Content>
  )
}
