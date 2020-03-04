import React from 'react'

export const VerticalTab = ({ selected, children, tabIndex }) => {
    return (
        <div
            style={{
                borderRight: selected ? '2px solid blue' : '2px solid rgba(0,0,0,0)',
                borderTop: tabIndex > 0 ? '1px solid gray' : '1px solid rgba(0,0,0,0)',
                padding: '1rem',
                width: '100%',
            }}
        >
            {children}
        </div>
    )
}
