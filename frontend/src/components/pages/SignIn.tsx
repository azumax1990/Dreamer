import React, { memo, useContext, useState, VFC } from 'react'
import Cookies from 'js-cookie'
import MediaQuery from 'react-responsive'
import { useHistory } from 'react-router-dom'
import { signIn } from '../../api/auth'
import { LoginUserContext } from '../../App'
import { SignInType } from '../../types'

import { PcResponsive } from '../mediaQuery/signIn/PcResponsive'
import { SignInPageHeader } from '../organisms/header/pcResponsive/SignInPageHeader'
import { SmartPhoneResponsive } from '../mediaQuery/signIn/SmartPhoneResponsive'
import { SignInPageSmartPhoneHeader } from '../organisms/header/smartPhoneResponsive/SignInPageSmartPhoneHeader'

export const SignIn: VFC = memo(() => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { setCurrentUser } = useContext(LoginUserContext)
  const history = useHistory()

  // signIn関数の引数
  const params: SignInType = {
    email: email,
    password: password
  }

  // ログイン&Cookie保存
  const submitSignIn = () => {
    signIn(params)
    .then((res) => {
      if (res.status === 200) {
        Cookies.set('access-token', res.headers['access-token']);
        Cookies.set('client', res.headers['client']);
        Cookies.set('uid', res.headers['uid']);
        setCurrentUser(res.data.data)
        history.push("/auditions")
        alert("ログインしました")
      } else {
        alert("ログイン出来ませんでした")
      }
    })
    .catch(() => alert("もう一度入力してください"))
  }
  return (
    <>
      <MediaQuery query="(min-width: 768px)">
        <SignInPageHeader />
        <PcResponsive email={email} setEmail={setEmail} password={password} setPassword={setPassword} submitSignIn={submitSignIn}/>
      </MediaQuery>
      <MediaQuery query="(max-width: 768px)">
        <SignInPageSmartPhoneHeader />
        <SmartPhoneResponsive email={email} setEmail={setEmail} password={password} setPassword={setPassword} submitSignIn={submitSignIn}/>
      </MediaQuery>
    </>
  )
})

