import React, { FC, useMemo, useContext } from 'react'
import { TabContext } from './TabManager'

export type TabProps = {
    id: string
}
export const Tab: FC<TabProps> = ({ children, id }) => {
    const { selectedTabId, tabIndices } = useContext(TabContext)

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

    return <>{tabAwareChildren}</>
}
