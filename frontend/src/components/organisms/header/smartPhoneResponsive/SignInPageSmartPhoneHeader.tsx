import React, { memo, VFC } from 'react'
import { Link } from 'react-router-dom'
import { LinkText } from '../../../atoms/header/smartPhone/LinkText'
import { SmartPhoneHeader } from '../../../Molecules/header/smartPhone/SmartPhoneHeader'

export const SignInPageSmartPhoneHeader: VFC = memo(() => {
  return (
    <SmartPhoneHeader>
      <Link to="/sign_up" style={{ textDecoration: "none", color: "black" }}>
        <LinkText>新規登録</LinkText>
      </Link>
    </SmartPhoneHeader>
  )
})
