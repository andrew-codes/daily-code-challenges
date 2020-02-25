import React, { FC } from 'react'
import { styled } from "linaria/react"
import SpacedGroup from "./SpacedGroup"

const Ol = styled.ol`
    margin: 0;
    padding: 0;
`

const Box: FC = ({ children, ...rest }) => <div {...rest}>{children}</div>

const Border = styled.div`
    border: 1px solid black;
`
const Kata: FC = () => (
    <Border>
        <SpacedGroup spacing={16}>
            <span>hello</span>
            <div>world</div>
        </SpacedGroup>
        <SpacedGroup as="div" spacing={16}>
            <li>hello</li>
            <li>world</li>
        </SpacedGroup>
        <SpacedGroup as={Ol} spacing={16}>
            <li>hello</li>
            <li>world</li>
        </SpacedGroup>
        <SpacedGroup as={Box} spacing={16}>
            <div>hello</div>
            <span>world</span>
        </SpacedGroup>
    </Border>
)

export default Kata
