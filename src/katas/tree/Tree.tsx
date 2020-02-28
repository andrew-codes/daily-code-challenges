import React, { useState, SyntheticEvent, useEffect } from 'react'
import { isEmpty, flatten, noop, uniq } from 'lodash'
import { TreeNode, NodeRenderer, TreeData, TreeNodeData } from './TreeNode'

const getChildren = <TNode extends TreeNodeData>(
  nodes: TreeData<TNode>,
  id: string
): Array<string> =>
  isEmpty(nodes[id]?.children)
    ? []
    : nodes[id].children.concat(
        flatten(nodes[id].children.map(childId => getChildren(nodes, childId)))
      )
const getMeAndMyParents = <TNode extends TreeNodeData>(
  nodes: TreeData<TNode>,
  id?: string
): Array<string> =>
  !id ? [] : [id].concat(flatten(getMeAndMyParents(nodes, nodes[id]?.parent)))

const TreeDefaultProps = {
  onSelectingLeaf: noop,
  indentation: '1rem',
  expandedByDefault: [],
}
export enum Expand {
  all = 'all',
}
export type TreeProps<TNode extends TreeNodeData> = {
  indentation?: string
  nodes: TreeData<TNode>
  expandedByDefault?: Array<string> | Expand
  NodeRenderer: NodeRenderer<TNode>
  onSelectingLeaf?: (selected: Array<string>) => void
} & typeof TreeDefaultProps

export function Tree<TNode extends TreeNodeData>({
  indentation,
  nodes,
  NodeRenderer,
  expandedByDefault,
  onSelectingLeaf,
}: TreeProps<TNode>) {
  const [openNodes, setOpenNodes] = useState([])
  useEffect(() => {
    if (expandedByDefault === Expand.all) {
      setOpenNodes(Object.entries(nodes).map(([id]) => id) as Array<never>)
    } else if (!isEmpty(expandedByDefault)) {
      const defaultExpanded = uniq(
        flatten(
          []
            .concat(expandedByDefault as Array<never>)
            .map(id => getMeAndMyParents(nodes, id))
        )
      )
      setOpenNodes(() => defaultExpanded as Array<never>)
    }
  }, [expandedByDefault, nodes])
  const openNode = (evt: SyntheticEvent, id: string) =>
    setOpenNodes(openNodes => {
      if (!openNodes.includes(id as never)) {
        return openNodes.concat([id as never])
      }
      const meAndMyChildren = [id].concat(getChildren(nodes, id))
      return openNodes.filter(nodeId => !meAndMyChildren.includes(nodeId))
    })

  const [selectedNodes, setSelectedNodes] = useState([])
  const selectNode = (evt: SyntheticEvent, id: string) => {
    setSelectedNodes(nodes => {
      if (!nodes.includes(id as never)) {
        return nodes.concat([id as never])
      }
      return nodes.filter(nodeId => nodeId !== id)
    })
  }
  useEffect(() => onSelectingLeaf(selectedNodes), [
    onSelectingLeaf,
    selectedNodes,
  ])

  return (
    <ul>
      {Object.entries(nodes)
        .filter(([id, node]) => node.isRoot)
        .map(([id, node]) => (
          <TreeNode
            id={id}
            indentation={indentation}
            key={id}
            level={0}
            node={node}
            nodes={nodes}
            onToggle={openNode}
            onSelect={selectNode}
            openNodes={openNodes}
            NodeRenderer={NodeRenderer}
            selectedNodes={selectedNodes}
          />
        ))}
    </ul>
  )
}
Tree.defaultProps = TreeDefaultProps
