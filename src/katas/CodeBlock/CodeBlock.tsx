import React, { FC } from 'react'
import styled from 'styled-components'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import { getTokenComponent } from './getTokenComponent'

const Pre = styled.pre`
    background-color: rgb(40, 42, 58);
    border-radius: 4px;
    tab-size: 2;
    hyphens: none;
    white-space: pre;
    white-space: pre-wrap;
    word-wrap: normal;
    font-family: Menlo, Monaco, "Courier New", monospace;
    font-size: 14px;
    padding: 1rem;
    text-shadow: none;
`

const Code = styled.code``

const LineNumber = styled.span`
    color: rgb(83, 87, 99);
    padding-right: 1rem;
`

const Line = styled.div<{ highlighted: boolean }>`
    background: ${({ highlighted }) => highlighted ? 'rgba(178, 185, 189, 0.15)' : undefined};
    line-height: 1.25;
`

const renderToken = (getTokenProps) => (token, index) => {
    const C = getTokenComponent(token)
    return <C {...getTokenProps({ token, key: index })} />
}

const CodeBlockDefaultProps = {
    lines: []
}
export type CodeBlockProps = {
    language: Language,
    code: string,
    lines?: Array<number>
} & typeof CodeBlockDefaultProps

export const CodeBlock: FC<CodeBlockProps> = ({ code, language, lines }) => (
    <Highlight {...defaultProps} code={code} language={language} theme={null}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <Pre className={className} style={style}>
                <Code>
                    {tokens.map((line, i) => (
                        <Line {...getLineProps({ line, key: i })} highlighted={lines.includes(i + 1)}>
                            <LineNumber>{i + 1}</LineNumber>
                            {line.map(renderToken(getTokenProps))}
                        </Line>
                    ))}
                </Code>
            </Pre>
        )}
    </Highlight>
)
CodeBlock.defaultProps = CodeBlockDefaultProps
