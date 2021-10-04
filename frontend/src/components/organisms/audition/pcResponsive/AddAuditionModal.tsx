import React, { Dispatch, useContext, VFC } from 'react'
import styled from 'styled-components'
import { FaCamera } from 'react-icons/fa'

import { PostAudition } from '../../../../api/audition'
import { Audition } from '../../../../types'
import { usePostAudition } from '../../../../hooks/usePostAudition'
import { LoginUserContext } from '../../../../App'

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
const ResetButton = styled.button`
  display: block;
  padding: 5px 10px;
  margin-bottom: 15px;
  border: none;
  box-shadow:  0 0 4px gray;
  cursor: pointer;
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
  box-shadow:  0 0 4px gray;
  cursor: pointer;
`
const SpanTag = styled.span`
  display: inline-block;
  padding-left: 10px;
  margin-bottom: 5px;
`

type  Props = {
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  auditions: Array<Audition>;
  setAuditions: Dispatch<React.SetStateAction<Array<Audition>>>;
}

export const AddAuditionModal: VFC<Props> = (props) => {
  const { setIsOpen, auditions, setAuditions } = props;
  const { onChangeImage, params, title, setTitle, description, setDescription, avatar, resetImage, setAvatar } = usePostAudition()
  const { currentUser } = useContext(LoginUserContext)

  const id: number = auditions.length + 1

  const audition: Audition = {
    id: id,
    user_id: currentUser?.id,
    title: title,
    description: description,
    avatar_url: avatar.data
  }
  const SubmitPostAudition = () => {
    PostAudition(params)
    .then((res) => {
      const newAuditions = [audition, ...auditions]
      setAuditions(newAuditions)
      setTitle('')
      setDescription('')
      setAvatar({data: '', name: ''})
      setIsOpen(false)
    })
  }
  
  return (
    <ModalWrapper>
      <OverLay>
        <Modal>
          <InputContainer>
            <LabelTag htmlFor="formTittle">タイトル</LabelTag>
            <InputTittle id="formTittle" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </InputContainer>
          <InputContainer>
            <LabelIconTag htmlFor="formImage"><FaCamera /><SpanTag>写真を追加する</SpanTag></LabelIconTag>
            <InputImageTag type="file" id="formImage" onChange={onChangeImage} />
          </InputContainer>
            {avatar.data ? (
              <>
                <ResetButton onClick={resetImage} >リセット</ResetButton>
                <ImgPreview src={avatar.data}/>
              </>
              ) : (null)}
          <InputContainer>
            <LabelTag htmlFor="formDescription">募集内容</LabelTag>
            <InputTag id="formDescription" value={description} onChange={(e) => setDescription(e.target.value)} />
          </InputContainer>
          <ButtonContainer>
            <ButtonTag onClick={() => setIsOpen(false)}>閉じる</ButtonTag>
            <ButtonTag onClick={SubmitPostAudition} disabled={!title || !description ? true : false} >保存</ButtonTag>
          </ButtonContainer>
        </Modal>
      </OverLay>
    </ModalWrapper>
  )
}
