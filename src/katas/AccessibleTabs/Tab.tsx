import React, { FC, useMemo, useContext } from 'react'
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
    padding: 0;
    text-align: unset;
    width: ${({ direction }) => direction === TabDirection.vertical ? '100%' : undefined};
`

export type TabProps = {
    id: string
}
export const Tab: FC<TabProps> = ({ children, id }) => {
    const { direction, selectTab, selectedTabId, tabIndices } = useContext(TabContext)

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
        <NoStylesButton direction={direction} aria-controls={`${id}-tabpanel`} aria-selected={id === selectedTabId} role="tab" type="button" onClick={() => selectTab(id)} id={id}>
            {tabAwareChildren}
        </NoStylesButton>
    )
}
