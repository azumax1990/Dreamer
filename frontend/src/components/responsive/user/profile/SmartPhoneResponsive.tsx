import React, { memo, useContext, VFC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { LoginUserContext } from '../../../../App'
import { Profile } from '../../../../types'
import avatarImage from '../../../../images/no-avatar.jpeg'


const ProfileWrapper = styled.div`
  padding: 50px 50px;
  
`
const ProfileLeftWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
`
const ProfileNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
`
const UserName = styled.h2`
  font-size: 20px;
  font-weight: lighter;
  margin: 0;
`
const EditButton = styled.button`
  cursor: pointer;
`
const ProfileAvatar = styled.img`
  width: 100%;
  height: 300px;
`
const ProfileRightWrapper = styled.div`
  width: 100%;
  
`
const ProfileInfoContainer = styled.div`
  border-bottom: solid 1px #DCDCDC;
`
const ProfileText = styled.p`
  font-size: 20px;
  opacity: 0.8;
`
const IntroductionContainer = styled.div`
`
const IntroductionText= styled.p`
  letter-spacing: 8px;
`
const ImagesWrapper = styled.div`
  padding: 0 50px;
`
const ImageContainer = styled.div`
  width: 100%;
  margin-top: 20px;
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

export const SmartPhoneResponsive: VFC<Props> = memo((props) => {
  const { profile } = props
  const { currentUser } = useContext(LoginUserContext)
  return (
    <>
      <ProfileWrapper>
        <ProfileLeftWrapper>
          <ProfileNameContainer>
            { profile.name ? (<UserName>{profile.name}</UserName>) : (<UserName>未設定</UserName>)}
            { currentUser?.id === profile?.user_id ? (
              <Link to={`/user/${currentUser?.id}/profile/edit`}>
                <EditButton>編集する</EditButton>
              </Link>
              ) : (
              <></>
              )
            }
          </ProfileNameContainer>
          {profile.avatar_url ? (<ProfileAvatar src={profile.avatar_url} alt="プロフィール"/>)
            : (
                <ProfileAvatar src={avatarImage} alt="プロフィール"/>
              )
          }
        </ProfileLeftWrapper>
        <ProfileRightWrapper>
          <ProfileInfoContainer>
            {profile.gender ? (<ProfileText>性別 : {profile.gender}</ProfileText>) : (<ProfileText>性別 : 未設定</ProfileText>)}
            {profile.age ? (<ProfileText>年齢 : {profile.age}歳</ProfileText>) : (<ProfileText>年齢 : 未設定</ProfileText>)}
            {profile.tall ? (<ProfileText>身長 : {profile.tall}cm</ProfileText>) : (<ProfileText>身長 : 未設定</ProfileText>)}
            {profile.prefecture ? (<ProfileText>出身地 : {profile.prefecture}</ProfileText>) : (<ProfileText>出身地 : 未設定</ProfileText>)}
          </ProfileInfoContainer>
          <IntroductionContainer>
            <IntroductionText>
              <IntroductionText>{profile.introduction}</IntroductionText>
            </IntroductionText>
          </IntroductionContainer>
        </ProfileRightWrapper>
      </ProfileWrapper>
      <ImagesWrapper>
        <ImageContainer>
          <ImageTag src="https://source.unsplash.com/random"/>
        </ImageContainer>
        <ImageContainer>
          <ImageTag src="https://source.unsplash.com/random"/>
        </ImageContainer>
        <ImageContainer>
          <ImageTag src="https://source.unsplash.com/random"/>
        </ImageContainer>
        <ImageContainer>
          <ImageTag src="https://source.unsplash.com/random"/>
        </ImageContainer>
        <ImageContainer>
          <ImageTag src="https://source.unsplash.com/random"/>
        </ImageContainer>
      </ImagesWrapper>
    </>
  )
})