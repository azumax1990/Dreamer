import React, { memo, useContext, VFC } from 'react'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import { signOut } from '../../../../api/auth'
import { LoginUserContext } from '../../../../App'

import { LinkText } from '../../../atoms/header/smartPhone/LinkText'
import { SmartPhoneHeader } from '../../../Molecules/header/smartPhone/SmartPhoneHeader'

export const TopPageSmartPhoneHeader: VFC = memo(() => {
  const { currentUser, setCurrentUser } = useContext(LoginUserContext)

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
    .catch(() => alert("ログアウト出来ませんでした"))
  }
  return (
    <SmartPhoneHeader>
      {currentUser ? (
        <>
          <Link to={`/user/${currentUser.id}/profile`} style={{ textDecoration: "none", color: "black" }}>
            <LinkText>Myページ</LinkText>
          </Link>
          <Link to="/audition" style={{ textDecoration: "none", color: "black" }}>
            <LinkText>募集する</LinkText>
          </Link>
          <LinkText onClick={submitSignOut}>ログアウト</LinkText>
        </>
      ) : (
        <>
          <Link to="/sign_up" style={{ textDecoration: "none", color: "black" }}>
            <LinkText>新規登録</LinkText>
          </Link>
          <Link to="/sign_in" style={{ textDecoration: "none", color: "black" }}>
            <LinkText>ログイン</LinkText>
          </Link>
        </>
      )}
    </SmartPhoneHeader>
  )
})
