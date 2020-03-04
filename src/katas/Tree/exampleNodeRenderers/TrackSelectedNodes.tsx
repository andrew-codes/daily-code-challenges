import React, { FC, useState } from 'react'
import { ExpansionNodeRenderer } from './ExpansionNodeRenderer'
import { Tree, TreeProps, TreeNodeData } from '../'

export const TrackSelectedNodes: FC<TreeProps<TreeNodeData>> = ({ nodes }) => {
    const [selected, setSelected] = useState([])
    return (
        <>
            <h3>Selected: {selected.join(', ')}</h3>
            <Tree
                expandedByDefault={['Node:3', 'Node:6']}
                NodeRenderer={ExpansionNodeRenderer}
                nodes={nodes}
                onSelectingLeaf={allSelected => setSelected(allSelected)}
            />
        </>
    )
}
