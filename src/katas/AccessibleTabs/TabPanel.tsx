import React, { FC, useContext } from 'react'
import { TabContext } from './TabManager'

export type TabContentProps = {
    tabId: string
}
export const TabPanel: FC<TabContentProps> = ({ children, tabId }) => {
    const { selectedTabId } = useContext(TabContext)

    return (
        <div aria-labelledby={tabId} hidden={selectedTabId !== tabId} id={`${tabId}-tabpanel`} role="tabpanel" tabIndex={0}>
            {children}
        </div>
    )
}
