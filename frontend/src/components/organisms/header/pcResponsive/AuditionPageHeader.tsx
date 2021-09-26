import React, { memo, useContext, VFC } from 'react'
import styled from 'styled-components'
import Cookies from 'js-cookie'

import { signOut } from '../../../../api/auth'
import { LoginUserContext } from '../../../../App'

import { HeaderItems } from '../../../atoms/header/pc/HeaderItems'
import { HeaderLeft } from '../../../Molecules/header/pcResponsive/HeaderLeft'
import { HeaderRight } from '../../../Molecules/header/pcResponsive/HeaderRight'
import { useHistory } from 'react-router'

const HeaderWrapper = styled.header`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: #E0FFFF;
`
export const AuditionPageHeader: VFC = memo(() => {
  const { currentUser, setCurrentUser } = useContext(LoginUserContext)
  const history = useHistory()

  // ログアウト&Cookie削除
  const submitSignOut = () => {
    signOut()
    .then((res) => {
      if (res.data.success === true) {
        Cookies.remove("access_token")
        Cookies.remove("client")
        Cookies.remove("uid")
        setCurrentUser(undefined)
        alert("ログアウトしました")
      } 
    })
    .catch(() => alert("ログアウト出来ませんでした。"))
  }
  const moveToSignUpPage  = () => (history.push("/sign_up"))
  const moveToSignInPage  = () => (history.push("/sign_in"))
  const moveToProfilePage = () => (history.push(`/user/${currentUser?.id}/profile`))
  return (
    <HeaderWrapper>
      <HeaderLeft />
      <HeaderRight>
        {!currentUser ? (
            <>
              <HeaderItems onClick={moveToSignUpPage}>新規登録</HeaderItems>
              <HeaderItems onClick={moveToSignInPage}>ログイン</HeaderItems>
            </>
          ) : (
            <>
              <HeaderItems onClick={moveToProfilePage}>Myページ</HeaderItems>
              <HeaderItems onClick={submitSignOut}>ログアウト</HeaderItems>
            </>
          )}
      </HeaderRight>
    </HeaderWrapper>
  )
})
