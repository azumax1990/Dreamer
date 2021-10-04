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
export const SignUpPageHeader: VFC = memo(() => {
  const history = useHistory()
  const moveToSignInPage  = () => (history.push("/sign_in"))

  return (
    <HeaderWrapper>
      <HeaderLeft />
      <HeaderRight>
        <HeaderItems onClick={moveToSignInPage}>ログイン</HeaderItems>
      </HeaderRight>
    </HeaderWrapper>
  )
})
