
import React from 'react'

export const BootstrapTab = ({ active, selected, children, tabIndex }) => {
    return (
        <div
            style={{
                border: '1px solid lightblue',
                borderRight: '1px solid lightblue',
                borderLeft: tabIndex === 0 ? '1px solid lightblue' : 'none',
                borderBottom: 'none',
                padding: '1rem',
                position: 'relative'
            }}
        >
            {children}
            {(selected || active) && (
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    height: '2px',
                    background: active ? 'orange' : 'blue',
                    width: '100%',
                    left: 0
                }} />
            )}
        </div>
    )
}
