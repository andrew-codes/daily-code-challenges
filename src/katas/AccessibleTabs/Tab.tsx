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
    const { activeTabId, direction, selectTab, selectedTabId, tabIndices, setActiveTabId } = useContext(TabContext)

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
        let nextTabId
        if (direction === TabDirection.horizontal) {
            if (evt.keyCode === 39) {
                nextTabId = getNextTabId(selectedTabId)
            } else if (evt.keyCode === 37) {
                nextTabId = getPreviousTabId(selectedTabId)
            }
        } else if (direction === TabDirection.vertical) {
            evt.preventDefault();
            if (evt.keyCode === 40) {
                nextTabId = getNextTabId(selectedTabId)
            } else if (evt.keyCode === 38) {
                nextTabId = getPreviousTabId(selectedTabId)
            }
        }

        if (!nextTabId) return
        selectTab(nextTabId)
        setActiveTabId(nextTabId)
    }

    const handleKeyDown = (evt) => {
        if (direction !== TabDirection.vertical) return
        if (evt.keyCode !== 40 && evt.keyCode !== 38) return
        evt.preventDefault();
    }

    const handleSelection = tabId => {
        selectTab(tabId)
        setActiveTabId(tabId)
    }

    const tabAwareChildren = useMemo(
        () =>
            React.Children.map(children, (child, index) =>
                React.cloneElement(child, {
                    selected: selectedTabId === id,
                    tabIndex: tabIndices[id],
                })
            ),
        [selectedTabId, children, tabIndices, id]
    )

    return (
        <NoStylesButton
            aria-controls={`${id}-tabpanel`}
            aria-selected={id === selectedTabId}
            direction={direction}
            id={id}
            onClick={() => handleSelection(id)}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            ref={buttonRef}
            role="tab"
            tabIndex={selectedTabId !== id ? -1 : undefined}
            type="button"
        >
            {tabAwareChildren}
        </NoStylesButton>
    )
}
