import { TabDirection } from "./Tabs"
import { Reducer } from "react"

export type TabState = {
    activeTab: string,
    autoSelect: boolean,
    direction: TabDirection,
    selectedTab: string,
    tabs: Array<string>,
}
export enum TabActionTypes {
    'activateTabAtIndex' = 'activateTabAtIndex',
    'clearActiveTab' = 'clearActiveTab',
    'selectTab' = 'selectTab',
    'setActiveTab' = 'setActiveTab',
    'setAutoSelect' = 'setAutoSelect',
    'setNextTabAsActive' = 'setNextTabAsActive',
    'setPreviousTabAsActive' = 'setPreviousTabAsActive',
    'setTabs' = 'setTabs',
    'setDirection' = 'setDirection'
}
export type ClearActiveTabAction = {
    type: TabActionTypes.clearActiveTab,
    payload: string
}
export type SetAutoSelectAction = {
    type: TabActionTypes.setAutoSelect,
    payload: { autoSelect: boolean }
}
export type SetActiveTabAction = {
    type: TabActionTypes.setActiveTab,
    payload: string
}
export type SelectTabAction = {
    type: TabActionTypes.selectTab | TabActionTypes.setNextTabAsActive | TabActionTypes.setPreviousTabAsActive,
    payload: string
}
export type ActivateTabAtIndexAction = {
    type: TabActionTypes.activateTabAtIndex
    payload: number
}
export type SetTabsAction = {
    type: TabActionTypes.setTabs
    payload: Array<string>
}
export type setTabsDirectionAction = {
    type: TabActionTypes.setDirection
    payload: TabDirection
}
export type TabAction = ClearActiveTabAction | SetActiveTabAction | SelectTabAction | SetAutoSelectAction | SetTabsAction | setTabsDirectionAction | ActivateTabAtIndexAction

export const initialState: TabState = {
    activeTab: '',
    autoSelect: false,
    direction: TabDirection.horizontal,
    selectedTab: '',
    tabs: [],
}

const setActiveTabReducer: Reducer<TabState, SetActiveTabAction> = (state, action) => {
    if (action.type !== TabActionTypes.setActiveTab) return state
    if (state.autoSelect) {
        return {
            ...state,
            activeTab: action.payload,
            selectedTab: action.payload,
        }
    }
    return {
        ...state,
        activeTab: action.payload,
    }
}

export const reducer: Reducer<TabState, TabAction> = (state, action) => {
    switch (action.type) {
        case TabActionTypes.clearActiveTab:
            if (state.activeTab !== action.payload) return state
            return {
                ...state,
                activeTab: '',
            }
        case TabActionTypes.setDirection:
            return {
                ...state,
                direction: action.payload
            }
        case TabActionTypes.setAutoSelect:
            return {
                ...state,
                autoSelect: action.payload.autoSelect
            }
        case TabActionTypes.setTabs:
            return {
                ...state,
                tabs: action.payload
            }
        case TabActionTypes.selectTab:
            return {
                ...state,
                selectedTab: action.payload,
            }
        case TabActionTypes.activateTabAtIndex:
            return setActiveTabReducer(state, { type: TabActionTypes.setActiveTab, payload: state.tabs[action.payload] })
        case TabActionTypes.setNextTabAsActive:
            let nextTabIndex = state.tabs.findIndex(id => id === action.payload)
            if (nextTabIndex + 1 >= state.tabs.length) {
                nextTabIndex = 0
            } else {
                nextTabIndex += 1
            }
            return setActiveTabReducer(state, { type: TabActionTypes.setActiveTab, payload: state.tabs[nextTabIndex] })
        case TabActionTypes.setPreviousTabAsActive:
            let previousTabIndex = state.tabs.findIndex(id => id === action.payload)
            if (previousTabIndex - 1 < 0) {
                previousTabIndex = state.tabs.length - 1
            } else {
                previousTabIndex -= 1
            }
            return setActiveTabReducer(state, { type: TabActionTypes.setActiveTab, payload: state.tabs[previousTabIndex] })
        case TabActionTypes.setActiveTab:
            return setActiveTabReducer(state, action)
        default:
            throw new Error(`Unsupported action.`)
    }
}
