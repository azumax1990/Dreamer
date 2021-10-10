import React, { memo, useState, useEffect, VFC, useContext } from 'react'
import MediaQuery from 'react-responsive'

import { Audition } from '../../types'
import { getAllAuditions } from '../../api/audition'

import { TopPageHeader } from '../organisms/header/pcResponsive/TopPageHeader'
import { TopPageSmartPhoneHeader } from '../organisms/header/smartPhoneResponsive/TopPageSmartPhoneHeader'
import { PcResponsive } from '../mediaQuery/audition/index/PcResponsive'
import { SmartPhoneResponsive } from '../mediaQuery/audition/index/SmartPhoneResponsive'
import { LoginUserContext } from '../../App'
import { Loading } from '../organisms/loading/Loading'

export const Auditions: VFC = memo(() => {
  const [isOpen, setIsOpen]       = useState(false)
  const [auditions, setAuditions] = useState<Array<Audition>>([])

  const { loading, setLoading } = useContext(LoginUserContext)
  const ChangeIsOpen = () => setIsOpen(true)

  useEffect(() => {
    setLoading(true)
    getAllAuditions()
    .then((res) => {
      setAuditions(res.data)
    })
    .catch(() => alert('オーディション情報読み込めませんでした'))
    .finally(() => setLoading(false))
  }, [setLoading])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MediaQuery query="(min-width: 768px)">
            <TopPageHeader ChangeIsOpen={ChangeIsOpen} />
            <PcResponsive auditions={auditions} isOpen={isOpen} setIsOpen={setIsOpen} setAuditions={setAuditions}/>
          </MediaQuery>
          <MediaQuery query="(max-width: 767px)">
            <TopPageSmartPhoneHeader />
            <SmartPhoneResponsive auditions={auditions}/>
          </MediaQuery>
        </>
      )}
    </>
  )
})
