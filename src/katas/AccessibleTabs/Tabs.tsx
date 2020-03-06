import React, { FC, useContext, useEffect } from 'react'
import { merge } from 'lodash'
import styled from 'styled-components'
import { SpacedGroup, Direction } from '../SpacedGroup'
import { TabContext } from './TabManager'

export enum TabDirection {
    horizontal = 'horizontal',
    vertical = 'vertical',
}

const TabsRoot = styled.div.attrs({ click: 'onClick' }) <Partial<TabsProps>>`
    cursor: pointer;
    width: ${({ direction }) => direction === TabDirection.vertical ? '100%' : undefined}
`

const defaultProps = {
    direction: TabDirection.horizontal,
}
export type TabsProps = {
    direction: TabDirection,
    label: string,
} & typeof defaultProps

export const Tabs: FC<TabsProps> = ({ children, direction, label }) => {
    const { setDirection, selectTab, selectedTabId, setTabIndices, tabIndices } = useContext(TabContext)

    useEffect(() => {
        const tabIndices = React.Children.toArray(children).reduce(
            (acc, child, index) => merge({}, acc, { [child.props.id]: index }),
            {}
        )
        setTabIndices(tabIndices)
    }, [React.Children.toArray(children).length, setTabIndices])

    useEffect(() => {
        setDirection(direction)
    }, [direction, setDirection])

    const getPreviousTab = (id) => {
        const tabIndex = tabIndices[id]
        let index
        if (tabIndex - 1 < 0) {
            index = Object.keys(tabIndices).length - 1
        }
        index = tabIndex - 1
        return Object.keys(tabIndices)[index]
    }
    const getNextTab = (id) => {
        const tabIndex = tabIndices[id]
        let index
        if (tabIndex + 1 > Object.keys(tabIndices).length - 1) {
            index = 0
        }
        index = tabIndex + 1
        return Object.keys(tabIndices)[index]
    }

    const handleKeyUp = evt => {
        console.log(evt.keyCode)
        if (direction === TabDirection.horizontal) {
            if (evt.keyCode === 39) {
                selectTab(getNextTab(selectedTabId))
            } else if (evt.keyCode === 37) {
                selectTab(getPreviousTab(selectedTabId))
            }
        }
    }


    return (
        <SpacedGroup
            aria-orientation={direction}
            as={(props) => <div {...props} onKeyUp={handleKeyUp} role="tablist" aria-label={label} />}
            centered
            spacing={0}
            direction={
                direction === TabDirection.horizontal
                    ? Direction.horizontal
                    : Direction.vertical
            }
        >
            {children}
        </SpacedGroup>
    )
}
Tabs.defaultProps = defaultProps
