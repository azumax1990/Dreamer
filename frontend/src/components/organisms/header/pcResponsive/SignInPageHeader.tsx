import React, { VFC, memo } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'

import { HeaderItems } from '../../../atoms/header/pc/HeaderItems'
import { HeaderLeft } from '../../../Molecules/header/pcResponsive/HeaderLeft'
import { HeaderRight } from '../../../Molecules/header/pcResponsive/HeaderRight'

const HeaderWrapper = styled.header`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  border-bottom: 1px #cccccc solid;
`
export const SignInPageHeader: VFC = memo(() => {
  const history = useHistory()
  const moveToSignUpPage  = () => (history.push("/sign_up"))

  return (
    <HeaderWrapper>
      <HeaderLeft />
      <HeaderRight>
        <HeaderItems onClick={moveToSignUpPage}>新規登録</HeaderItems>
      </HeaderRight>
    </HeaderWrapper>
  )
})