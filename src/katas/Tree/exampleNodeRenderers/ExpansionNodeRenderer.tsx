import React from 'react'

export const ExpansionNodeRenderer = ({
    expanded,
    indentation,
    isLeaf,
    level,
    name,
    onSelect,
}) => (
        <div style={{ paddingLeft: `${indentation}` }} onClick={onSelect}>
            {expanded ? '^' : isLeaf ? '*' : '>'} Level: {level}, {name}
        </div>
    )
