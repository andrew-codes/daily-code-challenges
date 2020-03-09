import React, { FC, createContext, useEffect, useReducer, Dispatch } from 'react'
import { first } from 'lodash'
import { reducer, initialState, TabActionTypes, TabState, TabAction } from './TabState'
import { TabDirection } from './Tabs'

const noopDispatch: Dispatch<TabAction> = state => state

export type TabContextType = {
    dispatch: Dispatch<TabAction>,
} & Pick<TabState, 'activeTab' | 'direction' | 'selectedTab' | 'tabs'>
export const TabContext = createContext<TabContextType>({
    direction: TabDirection.horizontal,
    dispatch: noopDispatch,
    activeTab: '',
    selectedTab: '',
    tabs: []
})

const defaultProps = {
    autoSelect: false,
}
export type TabManagerProps = {
    defaultSelected?: string
    autoSelect?: boolean
}

export const TabManager: FC<TabManagerProps> = ({
    autoSelect,
    children,
    defaultSelected,
}) => {
    const [{ activeTab, direction, selectedTab, tabs }, dispatch] = useReducer(reducer, { ...initialState, autoSelect })

    useEffect(() => {
        dispatch({ type: TabActionTypes.setAutoSelect, payload: { autoSelect } })
    }, [autoSelect])

    useEffect(() => {
        if (defaultSelected) {
            dispatch({ type: TabActionTypes.selectTab, payload: defaultSelected })
        } else {
            const defaultSelectedTab = first(tabs)
            if (defaultSelectedTab) {
                dispatch({ type: TabActionTypes.selectTab, payload: defaultSelectedTab })
            }
        }
    }, [defaultSelected, dispatch, tabs])

    return (
        <TabContext.Provider
            value={{
                dispatch,
                direction,
                tabs,
                selectedTab,
                activeTab
            }}
        >
            {children}
        </TabContext.Provider>
    )
}
TabManager.defaultProps = defaultProps
