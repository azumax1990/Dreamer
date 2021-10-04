import React, { memo, VFC } from 'react'
import { Link } from 'react-router-dom'
import { LinkText } from '../../../atoms/header/smartPhone/LinkText'
import { SmartPhoneHeader } from '../../../Molecules/header/smartPhone/SmartPhoneHeader'

export const SignUpPageSmartPhoneHeader: VFC = memo(() => {
  return (
    <SmartPhoneHeader>
      <Link to="/sign_in" style={{ textDecoration: "none", color: "black" }}>
        <LinkText>ログイン</LinkText>
      </Link>
    </SmartPhoneHeader>
  )
})
