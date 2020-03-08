import React, { FC, useContext } from 'react'
import { TabContext } from './TabManager'
import styled from 'styled-components'

const Root = styled.div`
    display: ${({ hidden }) => hidden ? 'none' : undefined} !important;
`

export type TabContentProps = {
    tabId: string
}
export const TabPanel: FC<TabContentProps> = ({ children, tabId }) => {
    const { selectedTab } = useContext(TabContext)

    return (
        <Root aria-labelledby={tabId} hidden={selectedTab !== tabId} id={`${tabId}-tabpanel`} role="tabpanel" tabIndex={0}>
            {children}
        </Root>
    )
}
