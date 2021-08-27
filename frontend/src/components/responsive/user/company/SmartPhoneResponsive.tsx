import React, { memo, useContext, VFC } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { LoginUserContext } from '../../../../App'
import { Profile } from '../../../../types'

const ProfileWrapper = styled.div`
  padding: 50px 50px;
`
const ProfileNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #DCDCDC;
  padding-bottom: 10px;
`
const CompanyName = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  
`
const EditButton = styled.button`
  cursor: pointer;
`
const IntroductionContainer = styled.div`
  padding: 25px 20px;
`
const IntroductionText = styled.p`
  font-size: 16px;
  // font-weight: bold;
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
  profile: Profile | undefined
}
export const SmartPhoneResponsive: VFC<Props> = memo((props) => {
  const { currentUser } = useContext(LoginUserContext)

  const { profile } = props;
  return (
    <>
      <ProfileWrapper>
        <ProfileNameContainer>
          { profile?.company ? (<CompanyName>{profile?.company}</CompanyName>) : (<CompanyName>未設定</CompanyName>)}
          { currentUser?.id === profile?.user_id ? (
            <Link to={`/user/${currentUser?.id}/profile/edit`}>
              <EditButton>編集する</EditButton>
            </Link>
            ) : (
            <></>
            )
          }
        </ProfileNameContainer>
        <IntroductionContainer>
          { profile?.description ? (<IntroductionText>{profile?.description}</IntroductionText>) : (<IntroductionText></IntroductionText>)}
        </IntroductionContainer>
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
