import React, { Dispatch, SetStateAction, VFC } from 'react'
import styled from 'styled-components'
import { Post } from '../../../../types'

const ModalWrapper = styled.div`
`
const OverLay = styled.div`
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`
const Modal = styled.div`
  background-color: #fff;
  width:40%;
  border-radius: 10px;
`
const ImageTag = styled.img`
  width: 100%;
  height: 500px;
`
const ContentWrapper = styled.div`
  padding: 20px;
  max-height: 100px;
  overflow: scroll;
`
const ContentText = styled.p`
  margin: 0;
`
type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  selectedPost: Post | undefined;
}
export const ModalImages: VFC<Props> = (props) => {
  const { setModalOpen, selectedPost } = props;

  return (
    <ModalWrapper>
      <OverLay onClick={() => setModalOpen(false)}>
        <Modal>
          <ImageTag src={selectedPost?.image_url} />
          <ContentWrapper>
            <ContentText>{selectedPost?.content}</ContentText>
          </ContentWrapper>
        </Modal>
      </OverLay>
    </ModalWrapper>
  )
}
