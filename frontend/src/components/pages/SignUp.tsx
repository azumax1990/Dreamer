import React, { memo, useContext, useState, VFC } from 'react'
import Cookies from 'js-cookie'
import MediaQuery from 'react-responsive'
import { useHistory } from 'react-router-dom'

import { signUp } from '../../api/auth'
import { LoginUserContext } from '../../App'
import { SignUpType } from '../../types'

import { SignUpPageHeader } from '../organisms/header/pcResponsive/SignUpPageHeader'
import { SignUpPageSmartPhoneHeader } from '../organisms/header/smartPhoneResponsive/SignUpPageSmartPhoneHeader'
import { PcResponsive } from '../mediaQuery/signUp/PcResponsive'
import { SmartPhoneResponsive } from '../mediaQuery/signUp/SmartPhoneResponsive'

export const SignUp: VFC = memo(() => {
  const [email, setEmail]                               = useState('')
  const [password, setPassword]                         = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const { setCurrentUser } = useContext(LoginUserContext)

  const history = useHistory()

  // SignUp関数の引数
  const params: SignUpType = {
    email: email,
    password: password,
    passwordConfirmation: passwordConfirmation
  }

  // 新規登録&Cookie保存の関数
  const submitSignUp = () => {
    signUp(params)
    .then((res) => {
      if (res.status === 200) {
        Cookies.set('access-token', res.headers['access-token']);
        Cookies.set('client', res.headers['client']);
        Cookies.set('uid', res.headers['uid']);
        setCurrentUser(res.data.data)
        history.push(`/user/${res.data.data.id}/profile`)
        alert("新規登録ありがとうございます。まず始めにプロフィールを作成しましょう。")
      } else {
        alert("登録出来ませんでした")
      }
    })
    .catch(() => alert("もう一度入力してください"))
  }

  return (
    <>
      <MediaQuery query="(min-width: 768px)">
        <SignUpPageHeader />
        <PcResponsive  email={email} setEmail={setEmail} password={password} setPassword={setPassword} passwordConfirmation={passwordConfirmation} setPasswordConfirmation={setPasswordConfirmation} submitSignUp={submitSignUp}/>
      </MediaQuery>
      <MediaQuery query="(max-width: 768px)">
        <SignUpPageSmartPhoneHeader />
        <SmartPhoneResponsive  email={email} setEmail={setEmail} password={password} setPassword={setPassword} passwordConfirmation={passwordConfirmation} setPasswordConfirmation={setPasswordConfirmation} submitSignUp={submitSignUp}/>
      </MediaQuery>
    </>
  )
})