import React, { FC, useMemo, useContext } from 'react'
import styled from 'styled-components'
import { TabContext } from './TabManager'

const TabRoot = styled.div.attrs({
	click: 'onClick',
})`
  cursor: pointer;
`

export type TabProps = {
	id: string
}
export const Tab: FC<TabProps> = ({ children, id }) => {
	const { selectedTabId, selectTab, tabIndices } = useContext(TabContext)

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

	return <TabRoot onClick={(evt) => selectTab(id)}>{tabAwareChildren}</TabRoot>
}
