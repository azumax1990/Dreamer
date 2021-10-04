import React, { VFC, memo, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { SmartPhoneHeader } from '../../../Molecules/header/smartPhone/SmartPhoneHeader'
import { LinkText } from '../../../atoms/header/smartPhone/LinkText'
import { Profile } from '../../../../types'
import { LoginUserContext } from '../../../../App'
import { signOut } from '../../../../api/auth'
import Cookies from 'js-cookie'

type Props = {
  profile: Profile | undefined;
}
export const ProfileSmartPhoneHeader: VFC<Props> = memo((props) => {
  const { profile } = props;
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
        history.push("/auditions")
      } 
    })
    .catch(() => alert("ログアウト出来ませんでした"))
  }
  return (
    <SmartPhoneHeader >
      { !currentUser ? (
        <>
          <Link to="/sign_up" style={{ textDecoration: "none", color: "black" }}>
            <LinkText>新規登録</LinkText>
          </Link>
          <Link to="/sign_in" style={{ textDecoration: "none", color: "black" }}>
            <LinkText>ログイン</LinkText>
          </Link>
        </>
      ) : currentUser?.id === profile?.user_id ? (
        <>
          <Link to="/post" style={{ textDecoration: "none", color: "black" }}>
            <LinkText>写真を追加する</LinkText>
          </Link>
          <Link to={`/user/${currentUser?.id}/groups`} style={{ textDecoration: "none", color: "black" }}>
            <LinkText>メッセージ</LinkText>
          </Link>
          <Link to={`/user/${currentUser?.id}/auditions`} style={{ textDecoration: "none", color: "black" }}>
            <LinkText>募集リスト</LinkText>
          </Link>
          <LinkText onClick={submitSignOut}>ログアウト</LinkText>
        </>
      ) : (
        <Link to={`/user/${currentUser?.id}/profile`} style={{ textDecoration: "none", color: "black" }}>
          <LinkText>Myページ</LinkText>
        </Link>
      )}
    </SmartPhoneHeader>
  )
})
