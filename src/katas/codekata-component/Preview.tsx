import React, { FC } from 'react'
import styled from 'styled-components'
const Root = styled.div`
  border: 1px solid gray;
  padding: 1rem;
`

export const Preview: FC = ({ children }) => (
  <Root>
    <h6>Preview</h6>
    {children}
  </Root>
)
