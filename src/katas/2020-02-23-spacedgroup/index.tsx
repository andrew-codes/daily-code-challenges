import React, { FC } from 'react'
import { styled } from "linaria/react"
import SpacedGroup from "./SpacedGroup"

const Ol = styled.ol`
    margin: 0;
    padding: 0;
`

const Button: FC = ({ children, ...rest }) => <button {...rest}>{children}</button>

const Kata: FC = () => (
    <>
        <SpacedGroup spacing={16}>
            <span>hello</span>
            <div>world</div>
        </SpacedGroup>
        <SpacedGroup as="ol" spacing={16}>
            <li>hello</li>
            <li>world</li>
        </SpacedGroup>
        <SpacedGroup as={Ol} spacing={16}>
            <li>hello</li>
            <li>world</li>
        </SpacedGroup>
        <SpacedGroup as={Button} spacing={16}>
            <div>hello</div>
            <span>world</span>
        </SpacedGroup>
    </>
)

export default Kata
