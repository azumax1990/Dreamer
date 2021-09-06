import React, { VFC }from 'react'
import styled from 'styled-components'

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
  imageUrl: string;
  id:       number | undefined;
  onClickOpen: (id: number | undefined) => void;
}
export const Images: VFC<Props> = (props) => {
  const { imageUrl, id, onClickOpen } = props;
  return (
    <ImageContainer onClick={() => onClickOpen(id)}>
      <ImageTag src={imageUrl} />
    </ImageContainer>
  )
}
