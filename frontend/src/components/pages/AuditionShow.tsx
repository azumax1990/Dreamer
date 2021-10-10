import React, { memo, VFC, useEffect, useContext } from 'react'
import MediaQuery from 'react-responsive'

import { LoginUserContext } from '../../App'
import { useAuditionShow } from '../../hooks/useAuditionShow'

import { AuditionPageHeader } from '../organisms/header/pcResponsive/AuditionPageHeader'
import { TopPageSmartPhoneHeader } from '../organisms/header/smartPhoneResponsive/TopPageSmartPhoneHeader'
import { PcResponsive } from '../mediaQuery/audition/show/PcResponsive'
import { SmartPhoneResponsive } from '../mediaQuery/audition/show/SmartPhoneResponsive'
import { Loading } from '../organisms/loading/Loading'


type Props = {
  id: string;
}

export const AuditionShow: VFC<Props>= memo((props) => {
  const { id } = props;
  const { setLoading, loading } = useContext(LoginUserContext)

  const { getAuditionShow, onClickPostApply, onDeleteAudition, onDeleteApply, audition, profile, hasApplied } = useAuditionShow()


  useEffect(() => getAuditionShow(id), [getAuditionShow, setLoading, id])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MediaQuery query="(min-width: 768px)">
            <AuditionPageHeader />
            <PcResponsive id={id} audition={audition} profile={profile} onClickPostApply={onClickPostApply} hasApplied={hasApplied} onDeleteAudition={onDeleteAudition} onDeleteApply={onDeleteApply}/>
          </MediaQuery>
          <MediaQuery query="(max-width: 767px)">
            <TopPageSmartPhoneHeader />
            <SmartPhoneResponsive id={id} audition={audition} profile={profile} onClickPostApply={onClickPostApply} hasApplied={hasApplied} onDeleteAudition={onDeleteAudition} onDeleteApply={onDeleteApply}/>
          </MediaQuery>
        </>
      )}
    </>
  )
})
