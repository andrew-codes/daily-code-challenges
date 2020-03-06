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
    const [direction, setDirection] = useState(TabDirection.horizontal)
    const [tabIndices, setTabIndices] = useState({})
    const selectTab = (id: string) => {
        setSelectedTabId(id)
    }

    useEffect(() => {
        const tabIds = Object.entries(tabIndices)
        if (defaultSelected) {
            setSelectedTabId(defaultSelected)
        } else {
            const defaultSelectedTab = first(tabIds)
            if (defaultSelectedTab) {
                setSelectedTabId(defaultSelectedTab[0])
            }
        }
    }, [defaultSelected, tabIndices])

    return (
        <TabContext.Provider
            value={{ direction, setDirection, selectTab, selectedTabId, setTabIndices, tabIndices }}
        >
            {children}
        </TabContext.Provider>
    )
}
