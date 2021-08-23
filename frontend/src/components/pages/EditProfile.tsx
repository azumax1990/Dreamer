import React, { ChangeEvent, memo, useContext, useState, useEffect,  VFC } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import { LoginUserContext } from '../../App'

import { getEditProfile, PostProfile } from '../../api/profile'

import { ages } from '../../data/age'
import { genders } from '../../data/gender'
import { heights } from '../../data/height'
import { prefectures } from '../../data/prefecture'
import { ParamsProfile } from '../../types'

const SignUpWrapper = styled.div`
  background-color: #F5F5F5;
  padding: 40px 0;
  min-height: 100vh;
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
const TextAreaTag = styled.textarea`
  width: 100%;
  height: 200px;
  font-size: 15px;
  box-sizing:border-box;
  padding: 8px;
  margin-top: 10px;
  border-color: #f5f5f5;
  outline: none;
  box-shadow:  0 0 3px gray;
`
const SelectTag = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  box-shadow: 0 0 3px gray;
  outline: none;
  font-size: 16px;
`
const OptionTag = styled.option`
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
  id: string;
}
export const EditProfile: VFC<Props> = memo((props) => {
  const { id } = props;

  const [name, setName]                 = useState('')
  const [avatar, setAvatar]             = useState({data: "", name: ""})
  const [age, setAge]                   = useState<number>()
  const [gender, setGender]             = useState('')
  const [tall, setTall]                 = useState<number>()
  const [prefecture, setPrefecture]     = useState('')
  const [introduction, setIntroduction] = useState('')

  const { currentUser } = useContext(LoginUserContext)
  const history = useHistory()
  
  const params: ParamsProfile = {
    id: currentUser?.id,
    name: name,
    age: age, 
    gender: gender,
    tall: tall, 
    prefecture: prefecture,
    introduction: introduction, 
    avatar: avatar,
    
  }

  // 編集プロフィール取得
  useEffect(() => {
    getEditProfile(currentUser?.id || 19)
    .then((res) => {
      setName(res.data.name ?? '')
      setAge(res.data.age ?? '')
      setGender(res.data.gender ?? '')
      setTall(res.data.tall)
      setPrefecture(res.data.prefecture ?? '')
      setIntroduction(res.data.introduction ?? '')
    })
    .catch(() => alert('エラー'))
  }, [currentUser])

  // プロフィールデータ送信
  const onClickPostProfile = () => {
    PostProfile(params)
    .then((res) => (
      history.push(`/user/${currentUser?.id}/profile`)
    ))
    .catch(() => alert("プロフィールを更新できませんでした"))
  }

  // プロフィール写真更新
  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader()
      const file = e.target.files[0];
      reader.onload = () => { 
        setAvatar({
          data: reader.result as string,
          name: file.name
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <SignUpWrapper>
        <PageTittle>プロフィール</PageTittle>
        <SignUpContainer>
          <InputContainer>
            <LabelTag htmlFor="formName">名前</LabelTag>
            <InputTag id="formName" value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
          </InputContainer>
          <InputContainer>
            <LabelTag htmlFor="formAvatar">写真</LabelTag>
            <InputTag type="file" id="formAvatar" name="avatar" onChange={(e: ChangeEvent<HTMLInputElement>) => (uploadImage(e))}/>
          </InputContainer>
          <InputContainer>
            <LabelTag htmlFor="formAge">年齢</LabelTag>
            <SelectTag id="formAge" value={age} onChange={(e: ChangeEvent<{ value: unknown }>) => (setAge(e.target.value as number))}>
              {ages.map((age: string, index: number) => (
                <OptionTag key={index} value={age}>{age}</OptionTag>
              ))}
            </SelectTag>
          </InputContainer>
          <InputContainer>
            <LabelTag htmlFor="formGender">性別</LabelTag>
            <SelectTag id="formGender" value={gender} onChange={(e: ChangeEvent<HTMLSelectElement>) => (setGender(e.target.value))}>
              {genders.map((gender: string, index: number) => (
                <OptionTag key={index} value={gender}>{gender}</OptionTag>
              ))}
            </SelectTag>
          </InputContainer>
          <InputContainer>
            <LabelTag htmlFor="formTall">身長</LabelTag>
            <SelectTag id="formTall" value={tall} onChange={(e: ChangeEvent<{ value: unknown }>) => (setTall(e.target.value as number))}>
              {heights.map((height: string, index: number) => (
                <OptionTag key={index} value={height}>{height}</OptionTag>
              ))}
            </SelectTag>
          </InputContainer>
          <InputContainer>
            <LabelTag htmlFor="formPrefecture">出身地</LabelTag>
            <SelectTag id="formPrefecture" value={prefecture} onChange={(e: ChangeEvent<HTMLSelectElement>) => (setPrefecture(e.target.value))}>
              {prefectures.map((prefecture: string, index: number) => (
                <OptionTag key={index} value={prefecture}>{prefecture}</OptionTag>
              ))}
            </SelectTag>
          </InputContainer>
          <InputContainer>
            <LabelTag htmlFor="formIntroduction">自己紹介</LabelTag>
            <TextAreaTag id="formIntroduction" value={introduction} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => (setIntroduction(e.target.value))}/>
          </InputContainer>
          <SubmitButton onClick={onClickPostProfile} disabled={name || age || gender || prefecture || tall || introduction || avatar ? false : true} >送信</SubmitButton>
        </SignUpContainer>
      </SignUpWrapper>
    </>
  )
})
