import React, { Dispatch, SetStateAction, useContext, useState, VFC } from 'react'
import styled from 'styled-components'
import { FaEllipsisV } from "react-icons/fa"
import { Post } from '../../../../types'
import { deleteImages } from '../../../../api/post'
import { LoginUserContext } from '../../../../App'

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
const ContentWrapperTop = styled.div`
  padding: 15px 10px; 
  display: flex;
  justify-content: space-between;
  position: relative;
`
const DeleteText = styled.p`
  background-color: #F5F5F5;
  padding: 10px;
  margin: 0;
  position: absolute;
  top: 45px;
  right: 10px;
  z-index: 10;
  border-radius: 10px;
`
const TimeText = styled.p`
  font-weight: bold;
  margin: 0;
`
const ContentText = styled.p`
  margin: 0;
`

type Props = {
  post:     Post;
  posts:    Array<Post>;
  setPosts: Dispatch<SetStateAction<Array<Post>>>;
}

export const Images: VFC<Props> = (props) => {
  const { post, posts, setPosts } = props;
  const [deletePost, setDeletePost] = useState(false)
  const { currentUser } = useContext(LoginUserContext)

  const onChangeDeletePost = () => setDeletePost(!deletePost)

  const onDeletePost = () => {
    deleteImages(post.id)
    .then((res) => {
      if (res.data.status === 'ok') {
        const newPosts = posts.filter((selectedPost) => selectedPost.id !== post.id)
        setPosts(newPosts)
        setDeletePost(!deletePost)
      }
    })
  }
  return (
    <ImageContainer >
      <ContentWrapperTop>
        <TimeText>{post.created_at}</TimeText>
        {currentUser?.id === post.user_id ? (
          <FaEllipsisV onClick={onChangeDeletePost}/>
        ) : (null)}
        {deletePost ? (
          <DeleteText onClick={onDeletePost}>写真を削除する</DeleteText>
        ) : (null)}
      </ContentWrapperTop>
      <ImageTag src={post.image_url} />
      <ContentWrapper>
        <ContentText>{post.content}</ContentText>
      </ContentWrapper>
    </ImageContainer>
  )
}
