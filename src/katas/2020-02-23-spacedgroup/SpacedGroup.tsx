import React, { ElementType, ComponentClass, StatelessComponent, FunctionComponent } from 'react'
import { styled } from "linaria/react";

type CSSUnit = 'px' | 'rem' | 'em' | '%' | 'pt'
const computeInnerSpacing = (spacing: number, unit: CSSUnit): string => {
    return `${Math.floor(spacing / 2)}${unit}`
}
const computeOuterSpacing = (spacing: number, unit: CSSUnit): string => {
    return `${spacing}${unit}`
}
const AsElementType = ({ as, ...rest }: Props) => React.createElement(as, { ...rest })

export enum Direction {
    horizontal = 'horizontal',
    vertical = 'vertical'
}

const defaultProps = {
    as: 'div',
    direction: Direction.horizontal,
    unit: 'px'
}
type Props = {
    as: ElementType | ComponentClass | StatelessComponent | FunctionComponent,
    children: React.ReactNode,
    direction?: Direction,
    spacing: number,
    spread?: boolean,
    centered?: boolean,
    unit: CSSUnit
}
const SpacedGroup = ({ as, centered, children, spacing, spread, unit }: Props) => {
    const Root = styled(AsElementType)`
        display: flex;
        padding: 0;
        > * {
            display: inline - flex;
            margin: ${ ({ spacing, unit }: Props) => computeInnerSpacing(spacing, unit)};
        }
        > *: first-child {
            margin-left: ${ ({ spacing, unit }: Props) => computeOuterSpacing(spacing, unit)};
        }
        > *: last-child {
            margin-right: ${ ({ spacing, unit }: Props) => computeOuterSpacing(spacing, unit)};
        }
    `
    return (
        <Root as={as} centered={centered} spacing={spacing} spread={spread} unit={unit}>
            {children}
        </Root>
    )
}
SpacedGroup.defaultProps = defaultProps

export default SpacedGroup
