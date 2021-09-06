import React, { ChangeEvent, Dispatch, SetStateAction, VFC } from 'react'
import styled from 'styled-components'
import { FaCamera } from 'react-icons/fa'
import { PostImages } from '../../../../api/post'
import { Post } from '../../../../types'
import { usePostImages } from '../../../../hooks/usePostImages'

const ModalWrapper = styled.div`
`
const OverLay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`
const Modal = styled.div`
  background-color: #fff;
  width:50%;
  padding: 20px 20px;
  border-radius: 10px;
`

const LabelIconTag = styled.label`
  font-size: 20px;
  &:hover {
    cursor: pointer;
  }
`
const LabelTag = styled.label`

`
const InputContainer = styled.div`
  padding-bottom: 25px;
`
const InputImageTag = styled.input`
  display: none;
`
const ImgPreview = styled.img`
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
`
const InputTag = styled.textarea`
  width: 100%;
  height: 200px;
  font-size: 16px;
  box-sizing:border-box;
  padding: 5px;
  margin-top: 10px;
  border-color: #f5f5f5;
  outline: none;
  box-shadow:  0 0 3px gray;
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ;
`
const ButtonTag = styled.button`
  display: block;
  padding: 5px 15px;
  margin-left: 20px;
  border: none;
  box-shadow:  0 0 3px gray;
  cursor: pointer;
`
const SpanTag = styled.span`
  display: inline-block;
  padding-left: 10px;
  margin-bottom: 5px;
`
type Props = {
  posts: Array<Post>;
  setPosts: Dispatch<SetStateAction<Array<Post>>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const AddImageModal: VFC<Props> = (props) => {
  const { setIsOpen, posts, setPosts } = props;
  
  const { content, setContent, image, params, onChangeImage, post } = usePostImages()

  const SubmitPosts = () => {
    PostImages(params)
    .then((res) => {
      setIsOpen(false)
      const newPosts = [post, ...posts]
      setPosts(newPosts)
    })
    .catch(() => alert("写真を追加出来ませんでした"))
  }
  return (
    <ModalWrapper>
      <OverLay>
        <Modal>
          <InputContainer>
            <LabelIconTag htmlFor="formImage"><FaCamera /><SpanTag>写真を追加する</SpanTag></LabelIconTag>
            <InputImageTag type="file" id="formImage" name="image"onChange={onChangeImage}/>
          </InputContainer>
          {image.data !== '' ? (<ImgPreview src={image.data}/>) : (null)}
          <InputContainer>
            <LabelTag htmlFor="formContent">コメント</LabelTag>
            <InputTag id="formContent" value={content} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}/>
          </InputContainer>
          <ButtonContainer>
            <ButtonTag onClick={() => setIsOpen(false)}>閉じる</ButtonTag>
            <ButtonTag onClick={SubmitPosts} disabled={image.data === '' && image.name === ''}>保存</ButtonTag>
          </ButtonContainer>
        </Modal>
      </OverLay>
      </ModalWrapper>
  )
}
