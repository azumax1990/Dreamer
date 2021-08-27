import React, { ChangeEvent, memo, VFC } from 'react'
import MediaQuery from 'react-responsive'
import styled from 'styled-components'
import { PcResponsive } from '../../responsive/edit/company/PcResponsive'
import { SmartPhoneResponsive } from '../../responsive/edit/company/SmartPhoneResponsive'

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
  box-shadow:  0 0 3px gray;
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
  border-color: #f5f5f5;
  outline: none;
  box-shadow:  0 0 3px gray;
`
type Props = {
  job:                  string;
  company?:             string;
  description?:         string;
  onChangeJob:          (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeCompany:      (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeDescription:  (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const EditCompanyProfile: VFC<Props> = memo((props) => {
  const { job, company, description, onChangeJob, onChangeCompany, onChangeDescription } = props;
  return (
    <>
      <MediaQuery query="(min-width: 768px)">
        <PcResponsive job={job} company={company} description={description} onChangeJob={onChangeJob} onChangeCompany={onChangeCompany} onChangeDescription={onChangeDescription}/>
      </MediaQuery>
      <MediaQuery query="(max-width: 767px)">
        <SmartPhoneResponsive job={job} company={company} description={description} onChangeJob={onChangeJob} onChangeCompany={onChangeCompany} onChangeDescription={onChangeDescription}/>
      </MediaQuery>
    </>
  )
})
