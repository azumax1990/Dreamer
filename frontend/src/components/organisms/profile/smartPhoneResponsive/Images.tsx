import React, { VFC } from 'react'
import styled from 'styled-components'
import { Post } from '../../../../types'

const ImageContainer = styled.div`
  width: 100%;
  margin-top: 30px;
`
const ImageTag = styled.img`
  width: 100%;
  height: 400px;
`
const ContentWrapper = styled.div`
  padding: 15px 10px;
  max-height: 200px;
  overflow: scroll
`
const ContentText = styled.p`
  margin: 0;
`

type Props = {
  post: Post;
}

export const Images: VFC<Props> = (props) => {
  const { post } = props;
  return (
    <ImageContainer >
      <ImageTag src={post.image_url} />
      <ContentWrapper>
        <ContentText>{post.content}</ContentText>
      </ContentWrapper>
    </ImageContainer>
  )
}
