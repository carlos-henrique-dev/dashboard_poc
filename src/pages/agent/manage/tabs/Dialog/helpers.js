import { v4 as uuidv4 } from 'uuid'

export const deepSearch = (data, key, callback) => {
  // Loop no array
  for (let index = 0; index < data.length; index++) {
    // Se encontrou o item, retorna o item, o index do item e o array original
    if (data[index].key === key) {
      return callback(data[index], index, data)
    }

    if (data[index].children) {
      deepSearch(data[index].children, key, callback)
    }
  }
}

export const addChildToNode = (list, currentNodeKey, child) => {
  return list.map((node) => {
    if (node.key === currentNodeKey) {
      const nodeChildren = node.children || []

      const newChild = {
        ...child,
        key: uuidv4(),
      }

      return { ...node, children: [...nodeChildren, newChild] }
    }

    if (node.children) {
      return { ...node, children: addChildToNode(node.children, currentNodeKey, child) }
    }

    return node
  })
}

export const addChildToParent = (list, currentChildKey, parentKey, child, position) => {
  if (parentKey) {
    return list.map((node) => {
      if (node.key === parentKey) {
        let newChildren = []

        const copyParentChildren = [...node.children] || []

        const currentChildIndex = copyParentChildren.findIndex((item) => item.key === currentChildKey)

        let spliceIndex = 0

        if (position === 'above') {
          spliceIndex = currentChildIndex
        }
        if (position === 'below') {
          spliceIndex = currentChildIndex + 1
        }

        copyParentChildren.splice(spliceIndex, 0, { ...child, key: uuidv4() })

        newChildren = copyParentChildren

        return { ...node, children: newChildren }
      }

      if (node.children) {
        return { ...node, children: addChildToParent(node.children, currentChildKey, parentKey, child, position) }
      }

      return node
    })
  } else {
    const ParentIndex = list.findIndex((item) => item.key === currentChildKey)

    const copyList = [...list]

    let spliceIndex = 0

    if (position === 'above') {
      spliceIndex = ParentIndex
    }
    if (position === 'below') {
      spliceIndex = ParentIndex + 1
    }

    copyList.splice(spliceIndex, 0, { ...child, key: uuidv4() })

    return copyList
  }
}

export const deleteNode = (list, currentNodeKey) => {
  return list
    .map((node) => node)
    .filter((elem) => {
      if (elem.children) {
        elem.children = deleteNode(elem.children, currentNodeKey)
      }

      return elem.key !== currentNodeKey
    })
}

export const updateNode = (list, currentNodeKey, updatedNode) => {
  return list.map((node) => {
    if (node.key === currentNodeKey) {
      return {
        ...node,
        ...updatedNode,
      }
    }

    if (node.children) {
      return {
        ...node,
        children: updateNode(node.children, currentNodeKey, updatedNode),
      }
    }

    return node
  })
}
