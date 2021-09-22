import React, { memo, useContext, VFC } from 'react'
import Cookies from 'js-cookie'
import styled from 'styled-components'

import { signOut } from '../../../../api/auth'
import { LoginUserContext } from '../../../../App'

import { HeaderItems } from '../../../atoms/header/pc/HeaderItems'
import { HeaderLeft } from '../../../Molecules/header/pcResponsive/HeaderLeft'
import { HeaderRight } from '../../../Molecules/header/pcResponsive/HeaderRight'
import { Profile } from '../../../../types'
import { useHistory } from 'react-router-dom'

const HeaderWrapper = styled.header`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  background-color: #E0FFFF;
`
type Props = {
  changeIsOpen: () => void;
  profile:      Profile | undefined;
}
export const ProfilePageHeader: VFC<Props> = memo((props) => {
  const { changeIsOpen, profile } = props;
  const history = useHistory()
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
      } 
    })
    .catch(() => alert("ログアウト出来ませんでした。"))
  }
  const moveToMyPage = () => history.push(`{/user/${currentUser?.id}/profile}`)
  return (
    <>
      <HeaderWrapper>
        <HeaderLeft />
        <HeaderRight>
          {currentUser?.id === profile?.user_id ? (
            <HeaderItems onClick={changeIsOpen}>写真を投稿する</HeaderItems>
          ) : (
            <HeaderItems onClick={moveToMyPage}>Myページ</HeaderItems>
          )}
          <HeaderItems onClick={submitSignOut}>ログアウト</HeaderItems>
        </HeaderRight>
      </HeaderWrapper>
    </>
  )
})
