import React from 'react'

export const TabBelow = ({ selected, children, tabIndex }) => {
    return (
        <div
            style={{
                border: '1px solid lightblue',
                borderRight: '1px solid lightblue',
                borderLeft:
                    tabIndex === 0 ? '1px solid lightblue' : 'none',
                borderTop: 'none',
                padding: '1rem',
                position: 'relative'
            }}
        >
            {children}
            {selected && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    height: '2px',
                    background: 'blue',
                    width: '100%',
                    left: 0
                }} />
            )}
        </div>
    )
}
