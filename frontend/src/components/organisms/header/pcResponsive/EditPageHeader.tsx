import Cookies from 'js-cookie'
import React, { useContext, VFC } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { signOut } from '../../../../api/auth'
import { LoginUserContext } from '../../../../App'
import { HeaderItems } from '../../../atoms/header/pc/HeaderItems'
import { HeaderLeft } from '../../../Molecules/header/pcResponsive/HeaderLeft'
import { HeaderRight } from '../../../Molecules/header/pcResponsive/HeaderRight'

const HeaderWrapper = styled.header`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  border-bottom: 1px #cccccc solid;
`
export const EditPageHeader: VFC = () => {
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
        history.push("/auditions")
        alert("ログアウトしました")
      } 
    })
    .catch(() => alert("ログアウト出来ませんでした。"))
  }
  const moveToProfilePage = () => (history.push(`/user/${currentUser?.id}/profile`))

  return (
    <>
     <HeaderWrapper>
        <HeaderLeft />
        <HeaderRight>
          <HeaderItems onClick={moveToProfilePage}>Myページ</HeaderItems>
          <HeaderItems onClick={submitSignOut}>ログアウト</HeaderItems>
        </HeaderRight>
      </HeaderWrapper> 
    </>
  )
}
