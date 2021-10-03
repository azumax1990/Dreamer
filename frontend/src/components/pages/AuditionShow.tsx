import React, { memo, VFC, useState, useEffect, useCallback, useContext } from 'react'
import MediaQuery from 'react-responsive'
import { useHistory } from 'react-router-dom'

import { postApply } from '../../api/apply'
import { getAudition } from '../../api/audition'
import { LoginUserContext } from '../../App'
import { ApplyParams, Audition, Profile, User } from '../../types'

import { AuditionPageHeader } from '../organisms/header/pcResponsive/AuditionPageHeader'
import { TopPageSmartPhoneHeader } from '../organisms/header/smartPhoneResponsive/TopPageSmartPhoneHeader'
import { PcResponsive } from '../mediaQuery/audition/show/PcResponsive'
import { SmartPhoneResponsive } from '../mediaQuery/audition/show/SmartPhoneResponsive'

type Props = {
  id: string;
}

export const AuditionShow: VFC<Props>= memo((props) => {
  const { id } = props;

  const [audition, setAudition]         = useState<Audition>()
  const [profile, setProfile]           = useState<Profile>()
  const [appliedUsers, setAppliedUsers] = useState<Array<User>>([])
  const { currentUser } = useContext(LoginUserContext)
  const hasApplied = appliedUsers.find((appliedUser) => appliedUser.id === currentUser?.id )
  const history = useHistory()

  useEffect(() => {
    getAudition(id)
    .then((res) => {
      setAudition(res.data.audition)
      setProfile(res.data.profile)
      setAppliedUsers(res.data.users)
    })
    .catch(() => alert('情報を取得出来ませんでした'))
  }, [])

  const params: ApplyParams = {
    user_id: currentUser?.id,
  }

  const onClickPostApply = useCallback(() => {
    postApply(id, params)
    .then((res) => {
      alert('応募が完了しました。記載元からの連絡をお待ちください')
      history.push("/auditions")
    })
  }, [params])
  
  
  return (
    <>
      <MediaQuery query="(min-width: 768px)">
        <AuditionPageHeader />
        <PcResponsive audition={audition} profile={profile} onClickPostApply={onClickPostApply} hasApplied={hasApplied}/>
      </MediaQuery>
      <MediaQuery query="(max-width: 767px)">
        <TopPageSmartPhoneHeader />
        <SmartPhoneResponsive audition={audition} profile={profile} onClickPostApply={onClickPostApply} hasApplied={hasApplied} />
      </MediaQuery>
    </>
  )
})
