import React, { VFC, memo } from 'react'
import styled from 'styled-components'
import { Audition } from '../../../../types'

const AuditionContainer = styled.div`
  display: flex;
  padding: 5px 10px;
  cursor: pointer;
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
`
const ContentContainer = styled.div`
  padding-left: 15px;
  display: flex;
  align-items: center;
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
  
  return (
    <>
      <AuditionContainer onClick={() => onChooseAudition(audition.id)}>
        <ImageContainer>
          <AuditionImage src="https://source.unsplash.com/random" />
        </ImageContainer>
        <ContentContainer>
          <AuditionTitle>{audition.title}</AuditionTitle>
        </ContentContainer>
      </AuditionContainer>

    </>
  )
})
