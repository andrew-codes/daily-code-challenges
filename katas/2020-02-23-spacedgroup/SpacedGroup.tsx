import React, { FC, createElement } from 'react'

export enum Direction {
    horizontal = 'horizontal',
    vertical = 'vertical'
}

const defaultProps = {
    as: 'div',
    direction: Direction.horizontal
}
type Props = {
    as: string | React.Component
    spacing: string | number,
    spread?: boolean,
    centered?: boolean,
    direction: Direction
} & typeof defaultProps

const SpacedGroup: FC<Props> = ({ as, centered, children, direction, spacing, spread }) => {
    return createElement(as, {
        children
    })
}
SpacedGroup.defaultProps = defaultProps

export default SpacedGroup
