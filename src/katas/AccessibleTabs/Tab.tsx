import React, { FC, useMemo, useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { TabContext } from './TabManager'
import { TabDirection } from './Tabs'
import { TabActionTypes } from './TabState'

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
    const { activeTab, direction, dispatch, selectedTab, tabs } = useContext(TabContext)

    const buttonRef = useRef()
    useEffect(() => {
        if (activeTab !== id || !buttonRef?.current) return
        buttonRef.current.focus()
    }, [activeTab, id, buttonRef.current])

    const handleBlur = () => {
        dispatch({ type: TabActionTypes.clearActiveTab, payload: id })
    }
    const handleFocus = () => {
        if (id === activeTab) return
        dispatch({ type: TabActionTypes.setActiveTab, payload: id })
    }
    const handleKeyDown = (evt) => {
        if (direction === TabDirection.vertical && (evt.keyCode === 40 || evt.keyCode === 38)) {
            evt.preventDefault()
        }
        if (evt.keyCode === 13) {
            dispatch({ type: TabActionTypes.selectTab, payload: id })
            return
        }
    }
    const handleKeyUp = (evt) => {
        if (evt.keyCode === 32) {
            dispatch({ type: TabActionTypes.selectTab, payload: id })
            return
        }
        if (direction === TabDirection.horizontal) {
            if (evt.keyCode === 39) {
                dispatch({ type: TabActionTypes.setNextTabAsActive, payload: id })
            } else if (evt.keyCode === 37) {
                dispatch({ type: TabActionTypes.setPreviousTabAsActive, payload: id })
            }
        } else if (direction === TabDirection.vertical) {
            evt.preventDefault();
            if (evt.keyCode === 40) {
                dispatch({ type: TabActionTypes.setNextTabAsActive, payload: id })
            } else if (evt.keyCode === 38) {
                dispatch({ type: TabActionTypes.setPreviousTabAsActive, payload: id })
            }
        }
    }
    const handleMouseUp = () => { dispatch({ type: TabActionTypes.selectTab, payload: id }) }


    const tabAwareChildren = useMemo(
        () =>
            React.Children.map(children, (child, index) =>
                React.cloneElement(child, {
                    selected: selectedTab === id,
                    active: activeTab === id,
                    tabIndex: tabs.findIndex(tabId => tabId === child.props.id),
                })
            ),
        [activeTab, selectedTab, children, tabs]
    )

    const selected = selectedTab === id

    return (
        <NoStylesButton
            aria-controls={`${id}-tabpanel`}
            aria-selected={selected}
            direction={direction}
            id={id}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onMouseUp={handleMouseUp}
            ref={buttonRef}
            role="tab"
            tabIndex={!selected ? -1 : undefined}
            type="button"
        >
            {tabAwareChildren}
        </NoStylesButton >
    )
}
