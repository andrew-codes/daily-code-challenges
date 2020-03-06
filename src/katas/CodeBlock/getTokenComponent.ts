import { FC } from 'react'
import { constant, cond, every, get, flow, some, stubFalse, stubTrue } from 'lodash/fp'
import { Green, Cyan, Red, Purple, Plain, LightGray, Orange, Yellow } from './TokenComponents'


type Token = {
    type: Array<string>
    content: string
}
type TokenOperand = (token: Token) => boolean
type TokenToComponent = (token: Token) => FC

const and = (...operands: Array<TokenOperand>): TokenOperand => flow([
    cond([
        [token => every<TokenOperand>(op => op(token))(operands), stubTrue],
        [stubTrue, stubFalse]
    ])
])
const not = flow([
    op => (flow([
        cond([
            [op, stubFalse],
            [stubTrue, stubTrue]
        ])
    ]))
])

const isKeyword: TokenOperand = flow([
    get('types'),
    some(type => type === 'keyword')
])
const isSpecialKeyword: TokenOperand = flow([
    get('content'),
    content => ['import', 'export', 'from', 'return'].includes(content)
])
const isFunction: TokenOperand = flow([
    get('types'),
    some(type => type === 'function')
])
const isOperator: TokenOperand = flow([
    get('types'),
    some(type => type === 'operator')
])
const isPunctuation: TokenOperand = flow([
    get('types'),
    some(type => type === 'punctuation')
])
const isSpread: TokenOperand = flow([
    get('types'),
    some(type => type === 'spread')
])
const isAttrValue: TokenOperand = flow([
    get('types'),
    some(type => type === 'attr-value')
])
const isAttrName: TokenOperand = flow([
    get('types'),
    some(type => type === 'attr-name')
])
const isTag: TokenOperand = flow([
    get('types'),
    some(type => type === 'tag')
])
const isClassName: TokenOperand = flow([
    get('types'),
    some(type => type === 'class-name')
])
const isNumber: TokenOperand = flow([
    get('types'),
    some(type => type === 'number')
])
const isMaybeClassName: TokenOperand = flow([
    get('types'),
    some(type => type === 'maybe-class-name')
])
const isConstant: TokenOperand = flow([
    get('types'),
    some(type => type === 'constant')
])
const isTemplateString: TokenOperand = flow([
    get('types'),
    some(type => type === 'template-string')
])
const isTemplatePunctuation: TokenOperand = flow([
    get('types'),
    some(type => type === 'template-punctuation')
])
const isString: TokenOperand = flow([
    get('types'),
    some(type => type === 'string')
])
const isParameter: TokenOperand = flow([
    get('types'),
    some(type => type === 'parameter')
])
const isBuiltIn: TokenOperand = flow([
    get('types'),
    some(type => type === 'builtin')
])
const isKnown: TokenOperand = flow([
    get('types'),
    some(type => type === 'known-class-name')
])
const isNumberType: TokenOperand = flow([
    get('content'),
    content => content === 'number'
])
const isReactType: TokenOperand = flow([
    get('content'),
    content => ['FC'].includes(content)
])
const isNullOrUndefinedKeywords: TokenOperand = flow([
    get('content'),
    content => ['null', 'undefined'].includes(content)
])
const isInterpolation: TokenOperand = flow([
    get('types'),
    some(type => type === 'interpolation')
])
const isScript: TokenOperand = flow([
    get('types'),
    some(type => type === 'script')
])
const isReactElement = and(isTag, isClassName)

const isModuleKeyword: TokenOperand = and(isKeyword, isSpecialKeyword)

export const getTokenComponent: TokenToComponent = flow([
    cond([
        [isModuleKeyword, constant(Red)],
        [isNumber, constant(Purple)],
        [isTemplatePunctuation, constant(Red)],
        [isNullOrUndefinedKeywords, constant(Purple)],
        [isBuiltIn, constant(Cyan)],
        [isKnown, constant(Cyan)],
        [isReactType, constant(Cyan)],
        [isNumberType, constant(Cyan)],
        [and(isInterpolation, isPunctuation), constant(LightGray)],
        [and(isParameter, isPunctuation), constant(LightGray)],
        [isParameter, constant(Orange)],
        [isString, constant(Yellow)],
        [isTemplateString, constant(Yellow)],
        [isConstant, constant(Purple)],
        [isMaybeClassName, constant(Purple)],
        [isKeyword, constant(Cyan)],
        [isFunction, constant(Green)],
        [isReactElement, constant(Red)],
        [and(isTag, isPunctuation), constant(LightGray)],
        [isOperator, constant(Red)],
        [isAttrValue, constant(Plain)],
        [isAttrName, constant(Cyan)],
        [and(isTag, isPunctuation), constant(Red)],
        [isSpread, constant(Red)],
        [and(isPunctuation, isSpread), constant(Orange)],
        [isPunctuation, constant(LightGray)],
        [and(isTag, not(isScript)), constant(Red)],
        [stubTrue, constant(Plain)],
    ])
])
