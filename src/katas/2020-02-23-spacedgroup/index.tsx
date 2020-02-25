import React, { FC } from 'react'
import SpacedGroup from "./SpacedGroup"

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
    </>
)

export default Kata
