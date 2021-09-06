import React, { memo, useContext, VFC } from 'react'
import Cookies from 'js-cookie'
import styled from 'styled-components'

import { signOut } from '../../../../api/auth'
import { LoginUserContext } from '../../../../App'

import { HeaderItems } from '../../../atoms/HeaderItems'
import { HeaderLeft } from '../../../Molecules/header/HeaderLeft'
import { HeaderRight } from '../../../Molecules/header/HeaderRight'

const HeaderWrapper = styled.header`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: #E0FFFF;
`

type Props = {
  changeIsOpen: () => void;
}
export const ProfilePageHeader: VFC<Props> = memo((props) => {
  const { changeIsOpen } = props;
  const { setCurrentUser } = useContext(LoginUserContext)

  // ログアウト&Cookie削除
  const submitSignOut = () => {
    signOut()
    .then((res) => {
      if (res.data.success === true) {
        Cookies.remove("access_token")
        Cookies.remove("client")
        Cookies.remove("uid")
        setCurrentUser(undefined)
      } 
    })
    .catch(() => alert("ログアウト出来ませんでした。"))
  }

  return (
    <>
      <HeaderWrapper>
        <HeaderLeft />
        <HeaderRight>
          <HeaderItems onClick={changeIsOpen}>写真を追加する</HeaderItems>
          <HeaderItems onClick={submitSignOut}>ログアウト</HeaderItems>
        </HeaderRight>
      </HeaderWrapper>
    </>
  )
})
