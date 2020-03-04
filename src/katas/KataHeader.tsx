import React, { FC } from "react";
import { SpacedGroup, Direction } from "./SpacedGroup/SpacedGroup";
import styled from 'styled-components'

const Header = styled.header`
    font-family: "Nunito Sans",-apple-system,".SFNSText-Regular","San Francisco",BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif;
`
const Bio = styled.div`
    border-bottom: 3px solid gray;
    padding-bottom: 1rem;
`
const ProfilePic = styled.img`
    border-radius: 4px;
    display: inline-block !important;
    height: 100px;
    width: 100px;
`
const Link = styled.a`
    font-family: "Nunito Sans",-apple-system,".SFNSText-Regular","San Francisco",BlinkMacSystemFont,"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif;
`
const Heading = styled.h1`
    margin-bottom: 0;
`

export type KataHeaderProps = {
    name: string
}

export const KataHeader: FC<KataHeaderProps> = ({ name }) => {
    const kataDirectory = name.replace(/ /g, '-')
    return (
        <Header>
            <Bio>
                <SpacedGroup spacing={16}>
                    <ProfilePic alt="Profile" src="https://www.gravatar.com/avatar/9c3d77fcdf0f8df38f39c6ef5b4cf47b?s=120" />
                    <SpacedGroup spacing={16} direction={Direction.vertical}>
                        <strong>Andrew Smith</strong>
                        <SpacedGroup noGutters spacing={16}>
                            <Link href="https://andrew.codes">Site</Link> |
                            <Link href="https://jas.link/github">GitHub</Link> |
                            <Link href="https://jas.link/linkedin">LinkedIn</Link> |
                            <Link href="https://jas.link/twitter">Twitter</Link>
                        </SpacedGroup>
                    </SpacedGroup>
                </SpacedGroup>
            </Bio>
            <SpacedGroup spacing={16} direction={Direction.vertical}>
                <Heading>{name}</Heading>
                <Link href={`https://github.com/andrew-codes/daily-code-challenges/tree/master/src/katas/${kataDirectory}`}>View the code on GitHub</Link>
            </SpacedGroup>
        </Header>
    )
}
