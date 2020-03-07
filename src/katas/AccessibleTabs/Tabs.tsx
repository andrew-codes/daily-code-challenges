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
    const { setDirection, selectedTabId, setTabIndices } = useContext(TabContext)

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

    return (
        <SpacedGroup
            aria-orientation={direction}
            as={(props) => <div {...props} role="tablist" aria-label={label} />}
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
