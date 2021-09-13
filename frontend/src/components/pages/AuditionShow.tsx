import React, { memo, VFC, useState, useEffect } from 'react'
import MediaQuery from 'react-responsive'

import { getAudition } from '../../api/audition'
import { Audition, Profile } from '../../types'
import { AuditionPageHeader } from '../organisms/header/pcResponsive/AuditionPageHeader'
import { TopPageSmartPhoneHeader } from '../organisms/header/smartPhoneResponsive/TopPageSmartPhoneHeader'
import { PcResponsive } from '../responsive/audition/show/PcResponsive'
import { SmartPhoneResponsive } from '../responsive/audition/show/SmartPhoneResponsive'

type Props = {
  id: string;
}

export const AuditionShow: VFC<Props>= memo((props) => {
  const { id } = props;
  const [audition, setAudition] = useState<Audition>()
  const [profile, setProfile]   = useState<Profile>()
  
  useEffect(() => {
    getAudition(id)
    .then((res) => {
      setAudition(res.data.audition)
      setProfile(res.data.profile)
    })
    .catch(() => alert('情報を取得出来ませんでした'))
  }, [id])

  return (
    <>
      <MediaQuery query="(min-width: 768px)">
        <AuditionPageHeader />
        <PcResponsive audition={audition} profile={profile} />
      </MediaQuery>
      <MediaQuery query="(max-width: 767px)">
        <TopPageSmartPhoneHeader />
        <SmartPhoneResponsive audition={audition} profile={profile}/>
      </MediaQuery>

    </>
  )
})
