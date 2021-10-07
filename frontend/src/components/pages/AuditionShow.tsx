import React, { memo, VFC, useEffect } from 'react'
import MediaQuery from 'react-responsive'

import { AuditionPageHeader } from '../organisms/header/pcResponsive/AuditionPageHeader'
import { TopPageSmartPhoneHeader } from '../organisms/header/smartPhoneResponsive/TopPageSmartPhoneHeader'
import { PcResponsive } from '../mediaQuery/audition/show/PcResponsive'
import { SmartPhoneResponsive } from '../mediaQuery/audition/show/SmartPhoneResponsive'
import { useAuditionShow } from '../../hooks/useAuditionShow'

type Props = {
  id: string;
}

export const AuditionShow: VFC<Props>= memo((props) => {
  const { id } = props;

  // const history         = useHistory()
  // const { currentUser } = useContext(LoginUserContext)

  const { getAuditionShow, onClickPostApply, onDeleteAudition, onDeleteApply, audition, profile, hasApplied } = useAuditionShow()


  useEffect(() => getAuditionShow(id), [getAuditionShow, id])

  // const onClickPostApply = useCallback(() => {
  //   const params: ApplyParams = {
  //     user_id: currentUser?.id,
  //   }
  //   postApply(id, params)
  //   .then((res) => {
  //     alert('応募が完了しました。記載元からの連絡をお待ちください')
  //     history.push("/")
  //   })
  // }, [currentUser?.id, history, id])

  // const onDeleteAudition = useCallback(() => {
  //   deleteAudition(audition?.id)
  //   .then((res) => {
  //     if (res.data.status === 'ok') {
  //       history.push("/")
  //       alert("募集を終了しました。")
  //     }
  //   })
  // }, [audition?.id, history])

  // const onDeleteApply = useCallback(() => {
  //   deleteApply(id, currentUser?.id)
  //   .then((res) => {
  //     if (res.data.status === 'ok') {
  //       history.push("/")
  //       alert("応募を取り消しました。")
  //     }
  //   })
  // }, [currentUser?.id, id, history])
  
  return (
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
  )
})
