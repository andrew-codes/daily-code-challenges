import React, { FC, useContext } from 'react'
import { TabContext } from './TabManager'

export type TabContentProps = {
	tabId: string
}
export const TabContent: FC<TabContentProps> = ({ children, tabId }) => {
	const { selectedTabId } = useContext(TabContext)

	return <>{selectedTabId === tabId && <div>{children}</div>}</>
}
