import React, { FC } from "react";
import { NodeRendererProps, TreeNodeData } from './TreeNode'

export const SimpleNodeRenderer: FC<NodeRendererProps<TreeNodeData>> = ({ indentation, isLeaf, level, name }) => (
    <div style={{ paddingLeft: `${indentation}` }}>
        {isLeaf ? '*' : '>'} Level: {level}, {name}
    </div>
)
