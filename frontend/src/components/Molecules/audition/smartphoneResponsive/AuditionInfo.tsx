import React, { memo, VFC } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Audition } from '../../../../types'

const AuditionContainer = styled.div`
  display: flex;
  padding: 7px 0;
  cursor: pointer;
`
const ImageContainer = styled.div`
`
const AuditionImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 100%;
`
const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 15px;
`
const AuditionTitleText = styled.p`
  margin: 0;
  height: 24px;
  overflow: hidden;
`
type Props = {
  audition: Audition;
}
export const AuditionInfo: VFC<Props> = memo((props) => {
  const { audition } = props;
  const history = useHistory()
  const MoveToAppliedUsersPage = () => history.push(`/audition/${audition.id}/users`)
  return (
    <AuditionContainer onClick={MoveToAppliedUsersPage}>
      <ImageContainer>
        {audition.avatar_url ? (
          <AuditionImage src={audition.avatar_url} />
        ) : (
          <AuditionImage src="https://source.unsplash.com/random" />
        )}
      </ImageContainer>
      <ContentContainer>
        <AuditionTitleText>{audition.title}</AuditionTitleText>
      </ContentContainer>
    </AuditionContainer>
  )
})
