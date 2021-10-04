import React, { memo, ReactNode, VFC } from 'react'
import styled from 'styled-components'

const LinkItem = styled.p` 
  border-bottom: 1px solid #e8e8e8;
  padding: 10px 0;
  margin: 0;
`
type Props = {
  children: ReactNode;
  onClick?: () => void;
}
export const LinkText: VFC<Props> = memo((props) => {
  const { children, onClick } = props;
  return (
    <LinkItem onClick={onClick}>{children}</LinkItem>
  )
})
