import React, { memo, useContext, VFC } from 'react'
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import styled from 'styled-components';

import { signOut } from '../../../../api/auth';
import { LoginUserContext } from '../../../../App';

import { HeaderItems } from '../../../atoms/HeaderItems';
import { HeaderLeft } from '../../../Molecules/header/HeaderLeft';
import { HeaderRight } from '../../../Molecules/header/HeaderRight';

const HeaderWrapper = styled.header`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: #E0FFFF;
`
export const TopPageHeader: VFC = memo(() => {
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
      } 
    })
    .catch(() => alert("ログアウト出来ませんでした。"))
  }
  const moveToSignUpPage =  () => (history.push("/auditions"))
  const moveToSignInPage =  () => (history.push("/sign_in"))
  const moveToProfilePage = () => (history.push(`/user/${currentUser?.id}/profile`))
  
  return (
      <HeaderWrapper>
        <HeaderLeft />
        <HeaderRight>
        {currentUser ? (
          <>
            <HeaderItems onClick={moveToProfilePage}>Myページ</HeaderItems>
            <HeaderItems onClick={submitSignOut}>ログアウト</HeaderItems>
          </>
        ) : (
          <>
            <HeaderItems onClick={moveToSignUpPage}>新規登録</HeaderItems>
            <HeaderItems onClick={moveToSignInPage}>ログイン</HeaderItems>
            <HeaderItems onClick={submitSignOut}>ログアウト</HeaderItems>
          </>
        )}
        </HeaderRight>
      </HeaderWrapper>
  )
})