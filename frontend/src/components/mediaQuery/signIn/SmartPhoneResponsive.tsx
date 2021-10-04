import React, { ChangeEvent, memo, VFC } from 'react'
import { Dispatch } from 'react'
import styled from 'styled-components'

const SignInWrapper = styled.div`
  padding: 20px 0;
  // height: 100vh;
`
const PageTittle = styled.h1`
  font-size: 24px;
  padding-top: 10px;
  margin: 0;
  text-align: center;
`
const SignInContainer = styled.div`
  width: 90%;
  padding: 10px;
  margin: 0 auto;
  box-sizing:border-box;
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
type Props = {
  email:                   string;
  setEmail:                Dispatch<React.SetStateAction<string>>;
  password:                string;
  setPassword:             Dispatch<React.SetStateAction<string>>;
  submitSignIn:            () => void;
}
export const SmartPhoneResponsive: VFC<Props> = memo((props) => {
  const { email, setEmail, password, setPassword, submitSignIn} = props;

  return (
    <SignInWrapper>
      <PageTittle>ログイン</PageTittle>
      <SignInContainer>
        <InputContainer>
          <LabelTag htmlFor="formEmail">Eメール</LabelTag>
          <InputTag id="formEmail" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}/>
        </InputContainer>
        <InputContainer>
          <LabelTag htmlFor="formPassword">Password</LabelTag>
          <InputTag type="password" id="formPassword" value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}/>
        </InputContainer>
        <SubmitButton onClick={submitSignIn} disabled={ email && password ? false : true}>ログイン</SubmitButton>
      </SignInContainer>
    </SignInWrapper>
  )
})
