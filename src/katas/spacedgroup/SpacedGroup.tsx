import React, {
  ElementType,
  ComponentClass,
  StatelessComponent,
  FunctionComponent,
} from 'react'
import styled from 'styled-components'

type CSSUnit = 'px' | 'rem' | 'em' | '%' | 'pt'
const computeInnerSpacing = (spacing: number, unit: CSSUnit): string => {
  return `${spacing / 2}${unit}`
}
const computeOuterSpacing = (spacing: number, unit: CSSUnit): string => {
  return `${spacing}${unit}`
}

export enum Direction {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

const defaultProps = {
  as: 'div',
  direction: Direction.horizontal,
  unit: 'px',
}
type RootProps = {
  children: React.ReactNode
  direction?: Direction
  noGutters?: boolean
  spacing: number
  spread?: boolean
  centered?: boolean
  unit: CSSUnit
}
type SpacedGroupProps = {
  as: ElementType | ComponentClass | StatelessComponent | FunctionComponent
} & RootProps
export const SpacedGroup = ({ as, ...rest }: SpacedGroupProps) => {
  const Root = styled(as)`
    display: flex;
    padding: 0;
    align-items: ${({ centered, direction }) =>
      direction === Direction.horizontal && centered ? 'center' : undefined};
    justify-items: ${({ centered, direction }) =>
      direction === Direction.vertical && centered ? 'center' : undefined};
    flex-direction: ${({ direction }) =>
      direction === Direction.horizontal ? 'row' : 'column'};
    height: ${({ direction, spread }) =>
      direction === Direction.vertical && spread ? '100%' : undefined};

    > * {
      display: ${({ spread }) => (spread ? 'flex' : 'inline-flex')};
      align-items: ${({ spread }) => (spread ? 'center' : undefined)};
      margin: ${({ direction, spacing, spread, unit }) =>
        spread
          ? '0'
          : direction === Direction.horizontal
          ? `0 ${computeInnerSpacing(spacing, unit)}`
          : `${computeInnerSpacing(spacing, unit)} 0`};
      flex: ${({ spread }) => (spread ? '1' : '')};
      justify-content: ${({ direction, spread }) =>
        spread && direction === Direction.horizontal ? 'center' : undefined};
    }

    &:before {
      content: ${({ spread }) => (spread ? '""' : undefined)};
      display: inline-flex;
      flex: 0.5;
    }

    &:after {
      content: ${({ spread }) => (spread ? '""' : undefined)};
      display: inline-flex;
      flex: 0.5;
    }

    > *:first-child {
      margin-left: ${({ direction, noGutters, spacing, spread, unit }) =>
        direction === Direction.horizontal && !noGutters && !spread
          ? computeOuterSpacing(spacing, unit)
          : 0};
      margin-top: ${({ direction, noGutters, spacing, spread, unit }) =>
        direction === Direction.vertical && !noGutters && !spread
          ? computeOuterSpacing(spacing, unit)
          : 0};
    }

    > *:last-child {
      margin-right: ${({ direction, noGutters, spacing, spread, unit }) =>
        direction === Direction.horizontal && !noGutters && !spread
          ? computeOuterSpacing(spacing, unit)
          : 0};
      margin-bottom: ${({ direction, noGutters, spacing, spread, unit }) =>
        direction === Direction.vertical && !noGutters && !spread
          ? computeOuterSpacing(spacing, unit)
          : 0};
    }
  `

  return <Root {...rest} />
}
SpacedGroup.defaultProps = defaultProps
