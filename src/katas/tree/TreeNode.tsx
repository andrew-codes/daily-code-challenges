import React, {
  ComponentClass,
  StatelessComponent,
  FunctionComponent,
  SyntheticEvent,
} from 'react'
import styled from 'styled-components'
import { isEmpty, partialRight } from 'lodash'

type TreeNodeRootProps = {
  level: number
  indentation: string
}
const TreeNodeRoot = styled.li<TreeNodeRootProps>`
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
`
const TreeNodeList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`
export type TreeData<TNode extends TreeNodeData> = {
  [key: string]: TNode
}

export type TreeNodeData = {
  [key: string]: any
  children: Array<string>
  isRoot?: boolean
  parent: string
}

export type NodeRendererProps<TNode extends TreeNodeData> = {
  id: string
  isLeaf: boolean
  isSelected: boolean
  isOpen: boolean
  nodes: TreeData<TNode>
  level: number
  onSelect: (evt: SyntheticEvent) => void
} & TNode &
  Omit<TreeNodeData, 'children' | 'parent'>

export type NodeRenderer<TNode extends TreeNodeData> =
  | ComponentClass<NodeRendererProps<TNode>>
  | StatelessComponent<NodeRendererProps<TNode>>
  | FunctionComponent<NodeRendererProps<TNode>>

export type TreeNodeProps<TNode extends TreeNodeData> = {
  nodes: TreeData<TNode>
  id: string
  indentation: string
  level: number
  node: TNode
  onSelect: (evt: SyntheticEvent, id: string) => void
  onToggle: (evt: SyntheticEvent, id: string) => void
  openNodes: Array<string>
  NodeRenderer: NodeRenderer<TNode>
  selectedNodes: Array<string>
}
export function TreeNode<TNode extends TreeNodeData>({
  id,
  indentation,
  level,
  node,
  nodes,
  onSelect,
  onToggle,
  openNodes,
  NodeRenderer,
  selectedNodes,
}: TreeNodeProps<TNode>) {
  const isLeaf = isEmpty(node.children)

  return (
    <TreeNodeRoot level={level} indentation={indentation}>
      <NodeRenderer
        {...node}
        id={id}
        isLeaf={isLeaf}
        isOpen={openNodes.includes(id) && !isLeaf}
        isSelected={selectedNodes.includes(id)}
        level={level}
        indentation={`calc(${level} * ${indentation})`}
        nodes={nodes}
        onSelect={
          isLeaf ? partialRight(onSelect, id) : partialRight(onToggle, id)
        }
      />
      {!isLeaf && openNodes.includes(id) && (
        <TreeNodeList>
          {node.children
            .map(id => ({ id, n: nodes[id] }))
            .map(({ id, n }) => (
              <TreeNode
                nodes={nodes}
                id={id}
                indentation={indentation}
                key={id}
                level={level + 1}
                node={n}
                onSelect={onSelect}
                onToggle={onToggle}
                openNodes={openNodes}
                NodeRenderer={NodeRenderer}
                selectedNodes={selectedNodes}
              />
            ))}
        </TreeNodeList>
      )}
    </TreeNodeRoot>
  )
}
