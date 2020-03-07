import React, { FC, useMemo, useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { TabContext } from './TabManager'
import { TabDirection } from './Tabs'

const NoStylesButton = styled.button<{ direction: TabDirection }>`
    appearance: none;
    background: none;
    border: none;
    color: currentColor;
    font: unset;
    margin: 0;
    outline: none;
    padding: 0;
    text-align: unset;
    width: ${({ direction }) => direction === TabDirection.vertical ? '100%' : undefined};
`

export type TabProps = {
    id: string
}
export const Tab: FC<TabProps> = ({ children, id }) => {
    const { activeTabId, clearActiveTab, direction, selectTab, selectedTabId, tabIndices, setActiveTab } = useContext(TabContext)
    const buttonRef = useRef()
    useEffect(() => {
        if (id === activeTabId) {
            buttonRef.current.focus()
        }
    }, [activeTabId, buttonRef, id])

    const getPreviousTabId = (id) => {
        const tabIndex = tabIndices[id]
        let index
        if (tabIndex - 1 < 0) {
            index = Object.keys(tabIndices).length - 1
        } else {
            index = tabIndex - 1
        }
        return Object.keys(tabIndices)[index]
    }
    const getNextTabId = (id) => {
        const tabIndex = tabIndices[id]
        let index
        if (tabIndex + 1 > Object.keys(tabIndices).length - 1) {
            index = 0
        } else {
            index = tabIndex + 1
        }
        return Object.keys(tabIndices)[index]
    }

    const handleKeyUp = evt => {
        if (evt.keyCode === 32) {
            selectTab(id)
            return
        }
        let nextTabId
        if (direction === TabDirection.horizontal) {
            if (evt.keyCode === 39) {
                nextTabId = getNextTabId(activeTabId)
            } else if (evt.keyCode === 37) {
                nextTabId = getPreviousTabId(activeTabId)
            }
        } else if (direction === TabDirection.vertical) {
            evt.preventDefault();
            if (evt.keyCode === 40) {
                nextTabId = getNextTabId(activeTabId)
            } else if (evt.keyCode === 38) {
                nextTabId = getPreviousTabId(activeTabId)
            }
        }
        if (!nextTabId) return
        setActiveTab(nextTabId)
    }

    const handleKeyDown = (evt) => {
        if (evt.keyCode === 13) {
            selectTab(id)
            return
        }
        if (direction === TabDirection.vertical && (evt.keyCode === 40 || evt.keyCode === 38)) {
            evt.preventDefault()
        }
    }

    const handleSelection = tabId => {
        selectTab(tabId)
    }

    const tabAwareChildren = useMemo(
        () =>
            React.Children.map(children, (child, index) =>
                React.cloneElement(child, {
                    selected: selectedTabId === id,
                    active: activeTabId === id,
                    tabIndex: tabIndices[id],
                })
            ),
        [activeTabId, selectedTabId, children, tabIndices, id]
    )

    return (
        <NoStylesButton
            aria-controls={`${id}-tabpanel`}
            aria-selected={id === selectedTabId}
            direction={direction}
            id={id}
            onBlur={() => {
                if (!Object.values(tabIndices).includes(document.activeElement.id)) {
                    clearActiveTab()
                }
            }}
            onFocus={() => {
                setActiveTab(id)
            }}
            onMouseDown={() => { setActiveTab(id) }}
            onMouseUp={() => { handleSelection(id) }}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            ref={buttonRef}
            role="tab"
            tabIndex={selectedTabId !== id ? -1 : undefined}
            type="button"
        >
            {tabAwareChildren}
        </NoStylesButton >
    )
}
