import React, { VFC, memo } from 'react'
import styled from 'styled-components'
import avatarImage from '../../../../images/no-avatar.jpeg'
import { Audition } from '../../../../types'


const AuditionContainer = styled.div`
  width: 100%;
  border-top: solid 1px #DCDCDC;
  display: flex;
  padding: 10px 0;
  cursor: pointer;
`
const ImageContainer = styled.div`
  width: 110px;
  height: 90px;
`
const ImageTag = styled.img`
  width: 110px;
  height: 100%;
`
const DetailContainer = styled.div`
  padding: 0 10px;
`
const TitleText = styled.p`
  font-size: 18px;
  font-weight: bold;
  opacity: 0.7;
  margin: 0;
  padding: 5px;
`
const TimeText = styled.p`
  font-size: 15px;
  color: gray;
  margin: 0;
  padding: 5px;
`
type Props = {
  audition: Audition;
}

export const AuditionSmartPhoneInfo: VFC<Props> = memo((props) => {
  const { audition } = props;
  return (
    <>
      <AuditionContainer>
        <ImageContainer>
          {audition.avatar_url ? (<ImageTag src={audition.avatar_url}/>) : (<ImageTag src={avatarImage}/>)}
        </ImageContainer>
        <DetailContainer>
          <TitleText>{audition.title}</TitleText>
          <TimeText>{audition.created_at}</TimeText>
        </DetailContainer>
      </AuditionContainer>
    </>
  )
})
