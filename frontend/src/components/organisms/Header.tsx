import React, { VFC } from 'react'
import { memo } from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0 80px;
  background-color: #E0FFFF;
`
const HeaderLeft = styled.div`
`

const HeaderRight = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const HeaderTittle = styled.h2`
  font-size: 28px;
`
const HeaderItems = styled.p`
  padding-left: 20px;
  margin: 0;
`
export const Header: VFC = memo(() => {
  return (
    <HeaderWrapper>
      <HeaderLeft>
        <HeaderTittle>Dreamer</HeaderTittle>
      </HeaderLeft>
      <HeaderRight>
        <HeaderItems>新規登録</HeaderItems>
        <HeaderItems>ログイン</HeaderItems>
        <HeaderItems>ログアウト</HeaderItems>
      </HeaderRight>
    </HeaderWrapper>
  )
})
