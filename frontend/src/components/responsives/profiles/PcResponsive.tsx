import React, { VFC, memo, useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { LoginUserContext } from '../../../App'
import { Profile } from '../../../types'

const ProfileWrapper = styled.div`
  padding: 50px 170px;
  display: flex;
`
const ProfileLeftWrapper = styled.div`
  width: 50%;
`
const ProfileAvatar = styled.img`
  width: 90%;
  height: 600px;
  padding-left: 30px;
`
const ProfileRightWrapper = styled.div`
  width: 47%;
  margin-left: auto;
`
const ProfileNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #DCDCDC;
`
const UserName = styled.h2`
  font-size: 35px;
  font-weight: lighter;
  margin: 0;
`
const EditButton = styled.button`
  cursor: pointer;
`
const ProfileInfoContainer = styled.div`
  padding-right: 10px;
  border-bottom: solid 1px #DCDCDC;
`
const ProfileText = styled.p`
  font-size: 18px;
  font-weight: bold;
  opacity: 0.7;
  text-align: right;
`
const IntroductionContainer = styled.div`
`
const IntroductionText= styled.p`
  letter-spacing: 8px;
`
const ImagesWrapper = styled.div`
  padding: 50px 170px;
  // background-color: gray;
  display: flex;
  // justify-content: space-around;
  flex-wrap: wrap;
`
const ImageContainer = styled.div`
  width: 30%;
  margin-top: 20px;
  margin-left: 28px;
  &:hover {
    cursor: pointer;
    opacity: 0.7;
  }
`
const ImageTag = styled.img`
  width: 100%;
  height: 300px;
`
type Props = {
  profile: Profile;
}
export const PcResponsive: VFC<Props> = memo((props) => {
  const { profile } = props
  const { currentUser } = useContext(LoginUserContext)
  return (
    <>
      <ProfileWrapper>
          <ProfileLeftWrapper>
            <ProfileAvatar src={profile.avatar_url} />
          </ProfileLeftWrapper>
          <ProfileRightWrapper>
            <ProfileNameContainer>
              {profile.name ? (<UserName>{profile.name}</UserName>) : (<UserName>未設定</UserName>)}
              <Link to={`/user/${profile.userId}/profile/edit`}>
                <EditButton>編集する</EditButton>
              </Link>
            </ProfileNameContainer>
            <ProfileInfoContainer>
              {profile.gender ? (<ProfileText>性別 : {profile.gender}</ProfileText>) : (<ProfileText>性別 : 未設定</ProfileText>)}
              {profile.age ? (<ProfileText>年齢 : {profile.age}歳</ProfileText>) : (<ProfileText>年齢 : 未設定</ProfileText>)}
              {profile.tall ? (<ProfileText>身長 : {profile.tall}cm</ProfileText>) : (<ProfileText>身長 : 未設定</ProfileText>)}
              {profile.prefecture ? (<ProfileText>出身地 : {profile.prefecture}</ProfileText>) : (<ProfileText>出身地 : 未設定</ProfileText>)}
            </ProfileInfoContainer>
            <IntroductionContainer>
              <IntroductionText>{profile.introduction}</IntroductionText>
            </IntroductionContainer>
          </ProfileRightWrapper>
        </ProfileWrapper>
        <ImagesWrapper>
          <ImageContainer>
            <ImageTag src="https://source.unsplash.com/random"/>
          </ImageContainer>
          <ImageContainer>
            <ImageTag src="https://source.unsplash.com/6GgCyNnF6Zs"/>
          </ImageContainer>
          <ImageContainer>
            <ImageTag src="https://source.unsplash.com/aRKA9tyySgE"/>
          </ImageContainer>
          <ImageContainer>
            <ImageTag src="https://source.unsplash.com/aRKA9tyySgE"/>
          </ImageContainer>
          <ImageContainer>
            <ImageTag src="https://source.unsplash.com/aRKA9tyySgE"/>
          </ImageContainer>
        </ImagesWrapper>
    </>
  )
})
