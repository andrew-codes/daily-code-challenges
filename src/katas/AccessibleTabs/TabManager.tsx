import React, { FC, createContext, useState, useEffect } from 'react'
import { first } from 'lodash'
import { TabDirection } from './Tabs'

export const TabContext = createContext({})

const defaultProps = {
    autoSelect: false,
}
export type TabManagerProps = {
    defaultSelected: string
    autoSelect?: boolean
} & typeof defaultProps

export const TabManager: FC<TabManagerProps> = ({
    autoSelect,
    children,
    defaultSelected,
}) => {
    const [selectedTabId, setSelectedTabId] = useState('')
    const [activeTabId, setActiveTabId] = useState('')
    const [direction, setDirection] = useState(TabDirection.horizontal)
    const [tabIndices, setTabIndices] = useState({})

    const selectTab = (id: string) => {
        setSelectedTabId(id)
        setActiveTabId(id)
    }

    const setActiveTab = (id: string) => {
        if (autoSelect) {
            selectTab(id)
        }
        setActiveTabId(id)
    }

    const clearActiveTab = () => {
        setActiveTabId('')
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
                clearActiveTab,
                direction,
                selectedTabId,
                selectTab,
                setActiveTab,
                setDirection,
                setTabIndices,
                tabIndices,
            }}
        >
            {children}
        </TabContext.Provider>
    )
}
TabManager.defaultProps = defaultProps
