import React, { VFC } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Audition } from '../../../../types'
import avatarImage from '../../../../images/no-avatar.jpeg'

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
  padding: 10px;
`
const TittleText = styled.p`
  font-size: 17px;
  font-weight: bold;
  opacity: 0.7;
  margin: 0;
  padding: 5px;
`
const TimeText = styled.p`
  font-size: 14px;
  color: gray;
  margin: 0;
  padding: 5px;
`
type Props = {
  audition: Audition;
}
export const AuditionInfo: VFC<Props> = (props) => {
  const { audition } = props;
  return (
    <AuditionContainer>
      <ImageContainer>
        {audition.avatar_url ? (<ImageTag src={audition.avatar_url} />) : (<ImageTag src={avatarImage} />)}
      </ImageContainer>
      <DetailContainer>
        <TittleText>{audition.title}</TittleText>
        {audition.created_at ? (<TimeText>{moment(audition.created_at).format('YYYY年MM月DD日')}</TimeText>) : (<TimeText>新着情報</TimeText>)}
      </DetailContainer>
    </AuditionContainer>
  )
}
