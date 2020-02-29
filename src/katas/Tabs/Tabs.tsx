import React, { FC, useContext, useEffect } from 'react'
import { merge } from 'lodash'
import { SpacedGroup, Direction } from '../SpacedGroup'
import { TabContext } from './TabManager'

export enum TabDirection {
	horizontal = 'horizontal',
	vertical = 'vertical',
}

const defaultProps = {
	direction: TabDirection.horizontal,
}
export type TabsProps = {
	direction: TabDirection
} & typeof defaultProps

export const Tabs: FC<TabsProps> = ({ children, direction }) => {
	const { setTabIndices } = useContext(TabContext)

	useEffect(() => {
		const tabIndices = React.Children.toArray(children).reduce(
			(acc, child, index) => merge({}, acc, { [child.props.id]: index }),
			{}
		)
		setTabIndices(tabIndices)
	}, [React.Children.toArray(children).length, setTabIndices])

	return (
		<SpacedGroup
			centered
			spacing={0}
			direction={
				direction === TabDirection.horizontal
					? Direction.horizontal
					: Direction.vertical
			}
		>
			{children}
		</SpacedGroup>
	)
}
Tabs.defaultProps = defaultProps
