import React, { ChangeEvent, memo, useContext, useState, VFC } from 'react'
import Cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { signIn } from '../../api/auth'
import { LoginUserContext } from '../../App'
import { SignInType } from '../../types'

const Header = styled.header`
  padding: 20px 0;
  
`
const HeaderTittle = styled.h2`
  font-size: 28px;
  text-align: center;
  margin: 0;
`
const SignUpWrapper = styled.div`
  background-color: #F5F5F5;
  padding: 40px 0;
  height: 100vh;
`

const PageTittle = styled.h1`
  font-size: 30px;
  padding-bottom: 25px;
  margin: 0 ;
  text-align: center;
`
const SignUpContainer = styled.div`
  width: 500px;
  background-color: #fff;
  padding: 50px 40px;
  margin: 0 auto;
  box-shadow:  0 0 3px gray;
`
const LabelTag = styled.label`
  font-size: 20px;
`

const InputContainer = styled.div`
  padding-bottom: 25px;
`

const InputTag = styled.input`
  width: 100%;
  font-size: 18px;
  box-sizing:border-box;
  padding: 8px;
  margin-top: 10px;
  border-color: #f5f5f5;
  outline: none;
  box-shadow:  0 0 3px gray;
` 
const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  font-size: 15px;
  box-shadow:  0 0 3px gray;
  cursor: pointer;
`
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
      } else {
        alert("ログイン出来ませんでした")
      }
    })
    .catch(() => alert("もう一度入力してください"))
  }
  return (
    <>
      <Header>
        <HeaderTittle>Welcome Back!!!</HeaderTittle>
      </Header>
      <SignUpWrapper>
        <PageTittle>ログイン</PageTittle>
        <SignUpContainer>
          <InputContainer>
            <LabelTag htmlFor="formEmail">Eメール</LabelTag>
            <InputTag id="formEmail" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
          </InputContainer>
          <InputContainer>
            <LabelTag htmlFor="formPassword">Password</LabelTag>
            <InputTag type="password" id="formPassword" value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
          </InputContainer>
          <SubmitButton onClick={submitSignIn} disabled={ email && password ? false : true}>ログイン</SubmitButton>
        </SignUpContainer>
      </SignUpWrapper>
    </>
  )
})

