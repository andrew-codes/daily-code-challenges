import React, { FC } from 'react'
import MDX from '@mdx-js/runtime'

const Mdx: FC = ({ children }) => {
  return <MDX>{children}</MDX>
}
export { Mdx }
