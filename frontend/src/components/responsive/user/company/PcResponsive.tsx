import React, { VFC, memo, useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { LoginUserContext } from '../../../../App'
import { Profile } from '../../../../types'


const ProfileWrapper = styled.div`
padding: 100px 170px;

`
const ProfileNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #DCDCDC;
`
const CompanyName = styled.h2`
  font-size: 35px;
  font-weight: lighter;
  margin: 0;
  padding-bottom: 10px;
`
const EditButton = styled.button`
  cursor: pointer;
`
const IntroductionContainer = styled.div`
  padding: 30px 20px;
`
const IntroductionText = styled.p`
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 8px;
`
const ImagesWrapper = styled.div`
  padding: 0 170px;
  display: flex;
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
type Props ={
  profile: Profile | undefined;
}
export const PcResponsive: VFC<Props> = memo((props) => {
  const { profile } = props;
  const { currentUser } = useContext(LoginUserContext)

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
          { profile?.description ? (<IntroductionText>{profile?.description}</IntroductionText>) : (<IntroductionText></IntroductionText>) }
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
