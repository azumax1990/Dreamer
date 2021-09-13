import React, { memo, VFC } from 'react'
import styled from 'styled-components'
import { FaCamera } from 'react-icons/fa'
import { usePostAudition } from '../../../hooks/usePostAudition'
import { AddAuditionPageHeader } from '../../organisms/header/smartPhoneResponsive/AddAuditionPageHeader'
import { PostAudition } from '../../../api/audition'
import { useHistory } from 'react-router-dom'

const InputWrapper = styled.div`
  padding: 20px;
`
const LabelIconTag = styled.label`
  font-size: 20px;
`
const LabelTag = styled.label`

`
const InputContainer = styled.div`
  padding-bottom: 25px;
`
const InputTittle = styled.input`
  width: 100%;
  font-size: 16px;
  box-sizing:border-box;
  padding: 5px;
  margin-top: 10px;
  border-color: #f5f5f5;
  outline: none;
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

const SubmitButton = styled.button`
  width: 100%;
  padding: 5px 15px;
  border: none;
  box-shadow:  0 0 3px gray;
  cursor: pointer;
`
export const CreateAudition: VFC = memo(() => {
  const history = useHistory()
  const { onChangeImage, params, title, setTitle, description, setDescription, image } = usePostAudition()
  
  const SubmitPostAudition = () => {
    PostAudition(params)
    .then((res) => {
      history.push("/auditions")
    })
    .catch(() => alert('投稿出来ませんでした'))
  }
  return (
    <>
      <AddAuditionPageHeader />
      <InputWrapper>
        <InputContainer>
          <LabelTag htmlFor="formTittle">タイトル</LabelTag>
          <InputTittle id="formTittle" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </InputContainer>
        <InputContainer>
          <LabelIconTag htmlFor="formImage"><FaCamera /></LabelIconTag>
          <InputImageTag type="file" id="formImage" onChange={onChangeImage} />
        </InputContainer>
          {image.data ? (<ImgPreview src={image.data}/>) : (null)}
        <InputContainer>
          <LabelTag htmlFor="formDescription">募集内容</LabelTag>
          <InputTag id="formDescription" value={description} onChange={(e) => setDescription(e.target.value)} />
        </InputContainer>
        <SubmitButton onClick={SubmitPostAudition} disabled={!title || !description ? true : false} >保存</SubmitButton>
      </InputWrapper>
    </>
  )
})
