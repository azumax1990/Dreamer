import React, { ChangeEvent, memo, VFC } from 'react'
import styled from 'styled-components'

const EditProfileWrapper = styled.div`
  background-color: #F5F5F5;
  padding: 40px 0;
  min-height: 100vh;
`

const PageTittle = styled.h1`
  font-size: 30px;
  padding-bottom: 25px;
  margin: 0 ;
  text-align: center;
`
const EditProfileContainer = styled.div`
  width: 500px;
  background-color: #fff;
  padding: 50px 40px;
  margin: 0 auto;
  box-shadow:  0 0 3px gray;
`
const LabelTag = styled.label`
  font-size: 20px;
`
const InputContainer = styled.div`
  padding-bottom: 25px;
`
const InputTag = styled.input`
  width: 100%;
  font-size: 18px;
  box-sizing:border-box;
  padding: 8px;
  margin-top: 10px;
  border-color: #f5f5f5;
  outline: none;
`
const RadioTag = styled.input`
`
const SpanTag = styled.span`
  font-size: 15px;
`
const TextAreaTag = styled.textarea`
  width: 100%;
  height: 200px;
  font-size: 15px;
  box-sizing:border-box;
  padding: 8px;
  margin-top: 10px;
  outline: none;
`
const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  font-size: 15px;
  box-shadow:  0 0 3px gray;
  cursor: pointer;
`
type Props = {
  job:                  string;
  company?:             string;
  description?:         string;
  onChangeJob:          (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeCompany:      (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeDescription:  (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onClickPostProfile:   () => void;
}
export const CompanyPcResponsive: VFC<Props> = memo((props) => {
  const { job, company, description, onChangeJob, onChangeCompany, onChangeDescription, onClickPostProfile } = props;

  return (
    <>
      <EditProfileWrapper>
        <PageTittle>プロフィール編集</PageTittle>
        <EditProfileContainer>
          <InputContainer>
            <RadioTag type="radio" id="formActor" name="type" value="演者" required checked={job === '演者'} onChange={onChangeJob}/>
            <LabelTag htmlFor="formActor">演者<SpanTag>（俳優、歌手、その他）</SpanTag></LabelTag>
            <br />
            <RadioTag type="radio" id="formCompany" name="type" value="企業" checked={job === '企業'} onChange={onChangeJob}/>
            <LabelTag htmlFor="formCompany">企業<SpanTag>（事務所、劇団、映像制作会社）</SpanTag></LabelTag>
          </InputContainer>
          <InputContainer>
            <LabelTag htmlFor="formCompany">名前</LabelTag>
            <InputTag id="formCompany" value={company} placeholder="会社名 劇団名 組織名" onChange={onChangeCompany} />
          </InputContainer>
          <InputContainer>
            <LabelTag htmlFor="formDescription">概要</LabelTag>
            <TextAreaTag id="formDescription" value={description} placeholder="作品一覧 公演一覧など..." onChange={onChangeDescription}/>
          </InputContainer>
          <SubmitButton onClick={onClickPostProfile} disabled={company || description ? false : true}>保存</SubmitButton>
        </EditProfileContainer>
      </EditProfileWrapper>
      
    </>
  )
})
