import React, { ChangeEvent, memo, VFC } from 'react'
import MediaQuery from 'react-responsive'
import { PcResponsive } from '../../mediaQuery/edit/company/PcResponsive'
import { SmartPhoneResponsive } from '../../mediaQuery/edit/company/SmartPhoneResponsive'

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
