import React, { FC, useContext, useEffect } from 'react'
import { SpacedGroup, Direction } from '../SpacedGroup'
import { TabContext } from './TabManager'
import { TabActionTypes } from './TabState'

export enum TabDirection {
    horizontal = 'horizontal',
    vertical = 'vertical',
}

const defaultProps = {
    direction: TabDirection.horizontal,
}
export type TabsProps = {
    direction?: TabDirection,
    label: string,
}

export const Tabs: FC<TabsProps> = ({ children, direction, label }) => {
    const { dispatch } = useContext(TabContext)

    useEffect(() => {
        const tabIds = React.Children.toArray(children).map((child) => child.props.id)
        dispatch({ type: TabActionTypes.setTabs, payload: tabIds })
    }, [React.Children.count(children), dispatch])

    useEffect(() => {
        dispatch({ type: TabActionTypes.setDirection, payload: direction })
    }, [direction, dispatch])

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
