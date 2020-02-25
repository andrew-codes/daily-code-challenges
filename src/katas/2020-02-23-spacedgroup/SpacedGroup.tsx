import React, { ElementType, ComponentClass, StatelessComponent, FunctionComponent } from 'react'
import { styled } from "linaria/react";

const computeInnerSpacing = (spacing: string | number): string => {
    if (typeof spacing === 'number') {
        return `${Math.floor(spacing / 2)}px`
    }
    return spacing
}
const computeOuterSpacing = (spacing: string | number): string => {
    if (typeof spacing === 'number') {
        return `${spacing}px`
    }
    return spacing
}
const AsElementType = ({ as, ...rest }: Props) => React.createElement(as, { ...rest })

export enum Direction {
    horizontal = 'horizontal',
    vertical = 'vertical'
}

const defaultProps = {
    as: 'div',
    direction: Direction.horizontal
}
type Props = {
    as: ElementType | ComponentClass | StatelessComponent | FunctionComponent,
    children: React.ReactNode,
    direction?: Direction,
    spacing: string | number,
    spread?: boolean,
    centered?: boolean,
}
const SpacedGroup = ({ as, centered, children, spacing, spread }: Props) => {
    const Root = styled(AsElementType)`
        display: flex;
        padding: 0;
        > * {
            display: inline-flex;
            margin: ${({ spacing }: Props) => computeInnerSpacing(spacing)};
        }
        > *:first-child {
            margin-left: ${({ spacing }: Props) => computeOuterSpacing(spacing)}
        }
        > *:last-child {
            margin-right: ${({ spacing }: Props) => computeOuterSpacing(spacing)}
        }
    `
    return (
        <Root as={as} centered={centered} spacing={spacing} spread={spread}>
            {children}
        </Root>
    )
}
SpacedGroup.defaultProps = defaultProps

export default SpacedGroup
