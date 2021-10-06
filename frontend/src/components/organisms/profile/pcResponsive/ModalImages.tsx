import React, { Dispatch, SetStateAction, useContext, useState, VFC } from 'react'
import styled from 'styled-components'
import { Post } from '../../../../types'
import { FaEllipsisV } from "react-icons/fa";
import { deleteImages } from '../../../../api/post';
import { LoginUserContext } from '../../../../App';

const ModalWrapper = styled.div`
`
const DeleteModal = styled.p`
  color: #fff;
  font-size: 50px;
  position:fixed;
  top: -40px;
  right:30px;
  z-index: 10;
  cursor: pointer;
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
  width:70%;
  border-radius: 10px;
  display: flex;
`
const ImageTag = styled.img`
  width: 70%;
  height: 600px;
`
const ContentWrapper = styled.div`
  width: 30%;
  padding: 20px;
  height: 550px;
  overflow: scroll;
`
const ContentWrapperTop = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  position: relative;
`
const TimeText = styled.p`
  font-weight: bold;
  margin: 0;
`
const DeleteText = styled.p`
  color: #fff;
  background-color:rgba(0,0,0,0.5);
  padding: 15px;
  margin: 0;
  position: absolute;
  right: 0;
  top: 25px;
  z-index: 2;
  border-radius: 10px;
  cursor: pointer;
`
const ContentText = styled.p`
  letter-spacing: 3px;
  margin: 0;
`
type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  selectedPost: Post | undefined;
  posts:        Array<Post>;
  setPosts:     Dispatch<SetStateAction<Array<Post>>>;
}
export const ModalImages: VFC<Props> = (props) => {
  const { setModalOpen, selectedPost, posts, setPosts } = props;
  const [deletePost, setDeletePost] = useState(false)
  const { currentUser } = useContext(LoginUserContext)

  const onChangeDeletePost = () => setDeletePost(!deletePost)

  const onDeletePost = () => {
    deleteImages(selectedPost?.id)
    .then((res) => {
      if (res.data.status === 'ok') {
        const newPosts = posts.filter((post) => post.id !== selectedPost?.id)
        setPosts(newPosts)
        setModalOpen(false)
      }
    })
  }
  return (
    <ModalWrapper>
      <DeleteModal onClick={() => setModalOpen(false)}>×</DeleteModal>
      <OverLay>
        <Modal>
          <ImageTag src={selectedPost?.image_url} />
          <ContentWrapper>
            <ContentWrapperTop>
              <TimeText>{selectedPost?.created_at}</TimeText>
              {currentUser?.id === selectedPost?.user_id ? (
                <FaEllipsisV style={{cursor: "pointer"}} onClick={onChangeDeletePost} />
              ) : (null)}
              { deletePost === true ? (<DeleteText onClick={onDeletePost}>写真を削除する</DeleteText>) : (null) }
            </ContentWrapperTop>
            <ContentText>{selectedPost?.content}</ContentText>
          </ContentWrapper>
        </Modal>
      </OverLay>
    </ModalWrapper>
  )
}
