import React, { FC } from 'react'
import { styled } from "linaria/react"
import SpacedGroup from "./SpacedGroup"

const Div = styled.div`
    margin: 0;
    padding: 0;
`

const Box: FC = ({ children, ...rest }) => <div {...rest}>{children}</div>

const Border = styled.div`
    border: 1px solid black;
`
const Kata: FC = () => (
    <>
        <Border>
            <SpacedGroup spacing={16}>
                <span>hello</span>
                <div>world</div>
            </SpacedGroup>
            <SpacedGroup as="div" spacing={16}>
                <span>hello</span>
                <div>world</div>
            </SpacedGroup>
            <SpacedGroup as={Div} spacing={16}>
                <span>hello</span>
                <div>world</div>
            </SpacedGroup>
            <SpacedGroup as={Box} spacing={16}>
                <div>hello</div>
                <span>world</span>
            </SpacedGroup>
        </Border>
        <Border>
            <SpacedGroup spacing={2} unit="rem">
                <span>hello</span>
                <div>world</div>
            </SpacedGroup>
            <SpacedGroup as="div" spacing={2} unit="rem">
                <span>hello</span>
                <div>world</div>
            </SpacedGroup>
            <SpacedGroup as={Div} spacing={2} unit="rem">
                <span>hello</span>
                <div>world</div>
            </SpacedGroup>
            <SpacedGroup as={Box} spacing={2} unit="rem">
                <div>hello</div>
                <span>world</span>
            </SpacedGroup>
        </Border>
    </>
)

export default Kata
