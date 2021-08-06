import React, { memo, useContext, VFC } from 'react'
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { signOut } from '../../api/auth';
import { LoginUserContext } from '../../App';

const HeaderWrapper = styled.header`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  margin: 0;
`
const HeaderItems = styled.p`
  padding-left: 20px;
  margin: 0;
  &:hover {
    cursor: pointer;
  } 
`
export const Header: VFC = memo(() => {
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
    <HeaderWrapper>
      <HeaderLeft>
        <HeaderTittle>Dreamer</HeaderTittle>
      </HeaderLeft>
      <HeaderRight>
        <Link to="/" style={{ textDecoration: "none", color: "black"}}>
          <HeaderItems>新規登録</HeaderItems>
        </Link> 
        <Link to="/sign_in" style={{ textDecoration: "none", color: "black"}}>
          <HeaderItems>ログイン</HeaderItems>
        </Link>
        <HeaderItems onClick={submitSignOut}>ログアウト</HeaderItems>
      </HeaderRight>
    </HeaderWrapper>
  )
})

