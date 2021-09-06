import React, { memo, useContext, useEffect, VFC } from 'react'
import styled from 'styled-components'
import MediaQuery from 'react-responsive'

import { LoginUserContext } from '../../App'
import { getEditProfile } from '../../api/profile'

import { EditPlayerProfile } from '../organisms/edit/EditPlayerProfile'
import { EditCompanyProfile } from '../organisms/edit/EditCompanyProfile'
import { useEditProfile } from '../../hooks/useEditProfile'
import { EditPageHeader } from '../organisms/header/pcResponsive/EditPageHeader'

const SignUpWrapper = styled.div`
  background-color: #F5F5F5;
  padding: 40px 0;
  min-height: 100vh;
`
const SignUpWrap = styled.div`
  background-color: #F5F5F5;
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
const SignUpContain = styled.div`
  width: auto;
  background-color: #fff;
  padding: 50px 40px;
  margin: 0 auto;
  // box-shadow:  0 0 3px gray;
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
  const { currentUser } = useContext(LoginUserContext)

  //hooks
  const { job,
          name,
          setName,
          avatar,
          age,
          setAge,
          gender,
          setGender,
          tall,
          setTall,
          prefecture,
          setPrefecture,
          introduction,
          setIntroduction,
          company,
          setCompany,
          description,
          setDescription,
          onClickPostProfile,
          onChangeImage,
          onChangeJob,
          onChangeName,
          onChangeAge,
          onChangeGender,
          onChangeTall,
          onChangePrefecture,
          onChangeIntroduction,
          onChangeCompany,
          onChangeDescription} = useEditProfile()

  // 編集プロフィール取得
  useEffect(() => {
    getEditProfile(currentUser?.id || id)
    .then((res) => {
      setName(res.data.name)
      setAge(res.data.age)
      setGender(res.data.gender)
      setTall(res.data.tall)
      setPrefecture(res.data.prefecture)
      setIntroduction(res.data.introduction)
      setCompany(res.data.company)
      setDescription(res.data.description)
    })
    .catch(() => alert('エラー'))
  }, [currentUser, id, setAge, setCompany, setDescription, setGender, setIntroduction, setName, setPrefecture, setTall])
  return (
    <>
      <EditPageHeader />
      <MediaQuery query="(min-width: 768px)">
        <SignUpWrapper>
          <PageTittle>プロフィール</PageTittle>
          <SignUpContainer>
            {job === '演者' ? (
              <EditPlayerProfile job={job}
                                name={name}
                                age={age}
                                gender={gender}
                                tall={tall}
                                prefecture={prefecture}
                                introduction={introduction}
                                onChangeImage={onChangeImage} 
                                onChangeJob={onChangeJob}
                                onChangeName={onChangeName}
                                onChangeAge={onChangeAge}
                                onChangeGender={onChangeGender}
                                onChangeTall={onChangeTall}
                                onChangePrefecture={onChangePrefecture}
                                onChangeIntroduction={onChangeIntroduction}
              />
            ) : (
              <EditCompanyProfile job={job}
                                  company={company}
                                  description={description}
                                  onChangeJob={onChangeJob}
                                  onChangeCompany={onChangeCompany}
                                  onChangeDescription={onChangeDescription}
              />
            )}
            <SubmitButton onClick={onClickPostProfile} disabled={name || age || gender || prefecture || tall || introduction || avatar ? false : true} >送信</SubmitButton>
          </SignUpContainer>
        </SignUpWrapper>
      </MediaQuery>
      <MediaQuery query="(max-width: 767px)">
        <SignUpWrap>
          <SignUpContain>
            <PageTittle>プロフィール</PageTittle>
            {job === '演者' ? (
              <EditPlayerProfile job={job}
                                 name={name}
                                 age={age}
                                 gender={gender}
                                 tall={tall}
                                 prefecture={prefecture}
                                 introduction={introduction}
                                 onChangeImage={onChangeImage} 
                                 onChangeJob={onChangeJob}
                                 onChangeName={onChangeName}
                                 onChangeAge={onChangeAge}
                                 onChangeGender={onChangeGender}
                                 onChangeTall={onChangeTall}
                                 onChangePrefecture={onChangePrefecture}
                                 onChangeIntroduction={onChangeIntroduction}
              />
            ) : (
              <EditCompanyProfile job={job}
                                    company={company}
                                    description={description}
                                    onChangeJob={onChangeJob}
                                    onChangeCompany={onChangeCompany}
                                    onChangeDescription={onChangeDescription}
              />
            )}
            <SubmitButton onClick={onClickPostProfile} disabled={name || age || gender || prefecture || tall || introduction || avatar ? false : true} >送信</SubmitButton>
          </SignUpContain>
        </SignUpWrap>
      </MediaQuery>
    </>
  )
})
