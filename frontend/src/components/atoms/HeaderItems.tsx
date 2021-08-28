import React, { ReactNode, VFC } from 'react'
import styled from 'styled-components'

const Items = styled.p`
  padding-left: 20px;
  margin: 0;
  &:hover {
    cursor: pointer;
  } 
`
type Props = {
  children: ReactNode;
  onClick:  () => void;
}
export const HeaderItems: VFC<Props> = (props) => {
  const { children, onClick } = props;
  return (
    <Items onClick={onClick}>
      {children}
    </Items>
  )
}
