import React, { FC, createContext, useState, useEffect } from 'react'
import { first } from 'lodash'
import { TabDirection } from './Tabs'

export const TabContext = createContext({})

export type TabManagerProps = {
    defaultSelected: string
}

export const TabManager: FC<TabManagerProps> = ({
    children,
    defaultSelected,
}) => {
    const [selectedTabId, setSelectedTabId] = useState('')
    const [activeTabId, setActiveTabId] = useState('')
    const [direction, setDirection] = useState(TabDirection.horizontal)
    const [tabIndices, setTabIndices] = useState({})
    const selectTab = (id: string) => {
        setSelectedTabId(id)
    }

    useEffect(() => {
        if (defaultSelected) {
            setSelectedTabId(defaultSelected)
        } else {
            const tabIds = Object.entries(tabIndices)
            const defaultSelectedTab = first(tabIds)
            if (defaultSelectedTab) {
                setSelectedTabId(defaultSelectedTab[0])
            }
        }
    }, [defaultSelected, tabIndices])

    return (
        <TabContext.Provider
            value={{
                activeTabId,
                direction,
                selectedTabId,
                selectTab,
                setActiveTabId,
                setDirection,
                setTabIndices,
                tabIndices,
            }}
        >
            {children}
        </TabContext.Provider>
    )
}
