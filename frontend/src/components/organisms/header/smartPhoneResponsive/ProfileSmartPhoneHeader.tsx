import React, { VFC, memo } from 'react'
import { Link } from 'react-router-dom'
import { SmartPhoneHeader } from '../../../Molecules/header/smartPhone/SmartPhoneHeader'
import { LinkText } from '../../../atoms/header/smartPhone/LinkText'

export const ProfileSmartPhoneHeader: VFC = memo(() => {
  
  return (
    <SmartPhoneHeader >
      <Link to="/post" style={{ textDecoration: "none", color: "black" }}>
        <LinkText>写真を追加する</LinkText>
      </Link>
    </SmartPhoneHeader>
  )
})
