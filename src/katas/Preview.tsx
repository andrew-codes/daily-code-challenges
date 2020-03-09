import React, { FC } from 'react'
import styled from 'styled-components'
import { CodeBlock } from './CodeBlock'

const Root = styled.div`
    box-shadow: rgba(0,0,0,0.10) 0 1px 3px 1px, rgba(0,0,0,0.065) 0 0 0 1px;
    border-radius: 4px;
    padding: 1rem;
`

export const Preview: FC = ({ children, mdxSource }) => (
    <Root>
        {children}
        <CodeBlock code={decodeURI(mdxSource).replace(/ {2}(.*)\n$/, '$1').replace(/ {4}(<)/g, '  $1').trim()} language="tsx" />
    </Root>
)
