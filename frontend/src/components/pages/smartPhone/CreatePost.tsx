import React, { useContext, VFC } from 'react'
import styled from 'styled-components'
import { FaAngleDoubleLeft } from "react-icons/fa"
import { FaCamera } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom'
import { LoginUserContext } from '../../../App'
import { usePostImages } from '../../../hooks/usePostImages'
import { PostImages } from '../../../api/post'

const HeaderWrapper = styled.header`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  margin: 0;
`
const SubmitButton = styled.button`
  border: none;
  background-color: #fff;
`
const PostWrapper = styled.div`
  padding: 50px 20px;
`
const PostContainer = styled.div`
  padding: 20px 0;
  min-height: 300px;
  box-shadow:  0 0 5px gray;
`
const InputImageTag = styled.input`
  display: none;
`
const ImagePreviewTag = styled.img`
  margin-top: 10px;
  width: 100%;
  height: 400px;
`
const LabelIconTag = styled.label`
  &:hover {
    cursor: pointer;
  }
`
const InputTag = styled.textarea`
  width: 100%;
  height: 300px;
  font-size: 16px;
  box-sizing:border-box;
  margin-top: 15px;
  padding: 0 20px;
  border: none;
  outline: none;
`

export const CreatePost: VFC = () => {
  const { currentUser } = useContext(LoginUserContext)
  const { content, setContent, image, params, onChangeImage } = usePostImages()
  const history = useHistory()

  const SubmitPosts = () => {
    PostImages(params)
    .then((res) => {
      history.push(`/user/${currentUser?.id}/profile`)
    })
    .catch(() => alert("写真を追加出来ませんでした"))
  }
  return (
    <>
      <HeaderWrapper>
        <Link to={`/user/${currentUser?.id}/profile`} style={{ textDecoration: "none", color: "black" }}>
          <FaAngleDoubleLeft  style={{ fontSize: "30px" }} />
        </Link>
        <SubmitButton disabled={image.name === '' && image.data === ''} onClick={SubmitPosts}>投稿する</SubmitButton>
      </HeaderWrapper>
      <PostWrapper>
        <PostContainer>
          <LabelIconTag htmlFor="formImage">
            <FaCamera style={{ fontSize: "25px", marginLeft: "20px"}} />
          </LabelIconTag>
          <InputImageTag type="file" id="formImage" onChange={onChangeImage}/>
          {image.data !== '' ? (<ImagePreviewTag src={image.data}/>) : (null)}   
          <InputTag placeholder="コメントを入力..." value={content} onChange={(e) => setContent(e.target.value)}/>
        </PostContainer>
      </PostWrapper>
    </>
  )
}
