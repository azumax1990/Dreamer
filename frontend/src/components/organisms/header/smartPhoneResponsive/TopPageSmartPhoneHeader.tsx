import React, { memo, useContext, VFC } from 'react'
import { Link } from 'react-router-dom'
import { LoginUserContext } from '../../../../App'

import { LinkText } from '../../../atoms/header/smartPhone/LinkText'
import { SmartPhoneHeader } from '../../../Molecules/header/smartPhone/SmartPhoneHeader'

export const TopPageSmartPhoneHeader: VFC = memo(() => {
  const { currentUser } = useContext(LoginUserContext)

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
          <LinkText>ログアウト</LinkText>
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
