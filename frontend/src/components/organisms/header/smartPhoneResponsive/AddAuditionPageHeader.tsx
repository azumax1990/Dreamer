import React, { memo, useContext, VFC } from 'react'
import { Link } from 'react-router-dom'
import { LoginUserContext } from '../../../../App'

import { SmartPhoneHeader } from '../../../Molecules/header/smartPhone/SmartPhoneHeader'
import { LinkText } from '../../../atoms/header/smartPhone/LinkText'



export const AddAuditionPageHeader: VFC = memo(() => {
  const { currentUser } = useContext(LoginUserContext)

  return (
    <SmartPhoneHeader>
      <Link to={`/user/${currentUser?.id}/profile`} style={{ textDecoration: "none", color: "black" }}>
        <LinkText>Myページ</LinkText>
      </Link>
      <LinkText>ログアウト</LinkText>
    </SmartPhoneHeader>
  )
})