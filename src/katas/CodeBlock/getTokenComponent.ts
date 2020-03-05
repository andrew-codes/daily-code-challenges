import { FC } from 'react'
import { constant, cond, every, get, flow, some, stubFalse, stubTrue, tap } from 'lodash/fp'
import { Function, Keyword, ModuleKeyword, Number, Operator, Plain, Punctuation, SpreadPunctuation, String } from './TokenComponents'


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

const isKeyword: TokenOperand = flow([
    get('types'),
    some(type => type === 'keyword')
])
const isModule: TokenOperand = flow([
    get('content'),
    content => ['import', 'export', 'from'].includes(content)
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
const isReactElement = and(isTag, isClassName)

const isModuleKeyword: TokenOperand = and(isKeyword, isModule)

export const getTokenComponent: TokenToComponent = flow([
    tap(console.log),
    cond([
        [isModuleKeyword, constant(ModuleKeyword)],
        [isNumber, constant(Number)],
        [isTemplatePunctuation, constant(ModuleKeyword)],
        [isBuiltIn, constant(Keyword)],
        [isKnown, constant(Keyword)],
        [isReactType, constant(Keyword)],
        [isNumberType, constant(Keyword)],
        [isParameter, constant(SpreadPunctuation)],
        [isString, constant(String)],
        [isTemplateString, constant(String)],
        [isConstant, constant(Number)],
        [isMaybeClassName, constant(Number)],
        [isKeyword, constant(Keyword)],
        [isFunction, constant(Function)],
        [isReactElement, constant(ModuleKeyword)],
        [and(isTag, isPunctuation), constant(Punctuation)],
        [isOperator, constant(Operator)],
        [isAttrValue, constant(Plain)],
        [isAttrName, constant(Keyword)],
        [and(isTag, isPunctuation), constant(ModuleKeyword)],
        [isSpread, constant(ModuleKeyword)],
        [and(isPunctuation, isSpread), constant(SpreadPunctuation)],
        [isPunctuation, constant(Punctuation)],
        [stubTrue, constant(Plain)]
    ])
])
