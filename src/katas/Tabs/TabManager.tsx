import React, { FC, createContext, useState, useEffect } from 'react'
import { first } from 'lodash'

export const TabContext = createContext({})

export type TabManagerProps = {
    defaultSelected: string
}

export const TabManager: FC<TabManagerProps> = ({
    children,
    defaultSelected,
}) => {
    const [selectedTabId, setSelectedTabId] = useState('')
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
            value={{ selectTab, selectedTabId, setTabIndices, tabIndices }}
        >
            {children}
        </TabContext.Provider>
    )
}
