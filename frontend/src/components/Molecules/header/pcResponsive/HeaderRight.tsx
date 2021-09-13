import React, { memo, VFC } from 'react'
import { ReactNode } from 'react'
import styled from 'styled-components'

const ItemsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
type Props = {
  children: ReactNode;
}
export const HeaderRight: VFC<Props> = memo((props) => {
  const { children } = props;
  return (
    <ItemsWrapper>
      {children}
    </ItemsWrapper>
  )
})
