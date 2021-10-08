import React, { VFC, memo } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Audition } from '../../../../types'

const AuditionContainer = styled.div`
  display: flex;
  padding: 5px 10px;
  &:hover {
    opacity: 0.7;
  }
`
const ImageContainer = styled.div`

`
const AuditionImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  cursor: pointer;
`
const ContentContainer = styled.div`
  padding-left: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
`
const AuditionTitle = styled.p`
  font-size: 18px;
  margin: 0;
  height: 24px;
  overflow: hidden;
`
type Props = {
  audition:         Audition;
  onChooseAudition: (id: number) => void;
}
export const AuditionInfo: VFC<Props> = memo((props) => {
  const { audition, onChooseAudition } = props;
  const history = useHistory()
  const moveToAuditionPage = () => history.push(`/audition/${audition?.id}`)
  return (
    <>
      <AuditionContainer>
        <ImageContainer onClick={moveToAuditionPage}>
          {audition.avatar_url ? (
            <AuditionImage src={audition.avatar_url} />
          ) : (
            <AuditionImage src="https://source.unsplash.com/random" />
          )}
        </ImageContainer>
        <ContentContainer onClick={() => onChooseAudition(audition.id)}>
          <AuditionTitle>{audition.title}</AuditionTitle>
        </ContentContainer>
      </AuditionContainer>

    </>
  )
})
