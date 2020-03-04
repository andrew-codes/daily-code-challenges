import React, { FC } from "react";
import { SpacedGroup, Direction } from "./SpacedGroup/SpacedGroup";
import styled from 'styled-components'

const Link = styled.a`
    font-family: "Nunito Sans",-apple-system,".SFNSText-Regular","San Francisco",BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif;
`

export type KataLinkProps = {
    kataDirectory: string
}

export const KataLinks: FC<KataLinkProps> = ({ kataDirectory }) => (
    <SpacedGroup spacing={16} direction={Direction.vertical}>
        <Link href="https://andrew.codes">Connect with me</Link>
        <Link href={`https://github.com/andrew-codes/daily-code-challenges/tree/master/src/katas/${kataDirectory}`}>View the code on GitHub</Link>
    </SpacedGroup>
)
