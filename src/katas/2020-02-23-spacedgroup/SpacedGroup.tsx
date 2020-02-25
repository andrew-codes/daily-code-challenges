import React, { ElementType } from 'react'
import { styled } from "linaria/react";

const computeInnerSpacing = (spacing: string | number | undefined): string => {
    if (!spacing) return '8px'
    if (typeof spacing === 'number') {
        return `${Math.floor(spacing / 2)}px`
    }
    return spacing
}

type DCProps = {
    as: string | ElementType
    children: React.ReactNode
}
const DynamicComponent = ({ as, children }: DCProps) => React.createElement(as, { children })

export enum Direction {
    horizontal = 'horizontal',
    vertical = 'vertical'
}

const defaultProps = {
    as: 'div',
    direction: Direction.horizontal
}
type Props = {
    as?: ElementType,
    children: React.ReactNode,
    direction?: Direction,
    spacing: string | number,
    spread?: boolean,
    centered?: boolean,
} & typeof defaultProps

const SpacedGroup = ({ as, children }: Props) => {
    const Root = styled(DynamicComponent)`
        diplay: flex
        > * {
            display: inline-flex;
            margin: ${({ spacing }: Partial<Props>) => computeInnerSpacing(spacing)};
        }
    `
    return (
        <Root as={as}>
            {children}
        </Root>
    )
}
SpacedGroup.defaultProps = defaultProps

export default SpacedGroup
