import React, { FC } from 'react'
import styled from 'styled-components'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'

const CodeBlockPre = styled.pre`
    border-radius: 4px;
    overflow: auto;
    padding: 1rem;
`

const LineNumber = styled.span`
    padding-right: 1rem;
`


const Line = styled.div<{ highlighted: boolean }>`
line-height: 1.25;
    background: ${({ highlighted }) => highlighted ? '#4e4961' : undefined}
`


const CodeBlockDefaultProps = {
    lines: []
}
export type CodeBlockProps = {
    language: Language,
    code: string,
    lines?: Array<number>
} & typeof CodeBlockDefaultProps

export const CodeBlock: FC<CodeBlockProps> = ({ code, language, lines }) => (
    <Highlight {...defaultProps} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <CodeBlockPre className={className} style={style}>
                {tokens.map((line, i) => (
                    <Line {...getLineProps({ line, key: i })} highlighted={lines.includes(i + 1)}>
                        <LineNumber>{i + 1}</LineNumber>
                        {line.map((token, key) => (
                            <span {...getTokenProps({ token, key })} />
                        ))}
                    </Line>
                ))}
            </CodeBlockPre>
        )}
    </Highlight>
)
CodeBlock.defaultProps = CodeBlockDefaultProps
