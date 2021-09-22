import React, { VFC, memo, useContext } from 'react'
import { Link } from 'react-router-dom'
import { SmartPhoneHeader } from '../../../Molecules/header/smartPhone/SmartPhoneHeader'
import { LinkText } from '../../../atoms/header/smartPhone/LinkText'
import { Profile } from '../../../../types'
import { LoginUserContext } from '../../../../App'

type Props = {
  profile: Profile | undefined;
}
export const ProfileSmartPhoneHeader: VFC<Props> = memo((props) => {
  const { profile } = props;
  const { currentUser } = useContext(LoginUserContext)
  
  return (
    <SmartPhoneHeader >
      {currentUser?.id === profile?.user_id ? (
        <Link to="/post" style={{ textDecoration: "none", color: "black" }}>
          <LinkText>写真を追加する</LinkText>
        </Link>
      ) : (
        <Link to={`/user/${currentUser?.id}/profile`} style={{ textDecoration: "none", color: "black" }}>
          <LinkText>Myページ</LinkText>
        </Link>
      )}
    </SmartPhoneHeader>
  )
})
