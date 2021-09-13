import React, { memo, useState, useEffect, VFC } from 'react'
import MediaQuery from 'react-responsive'

import { Audition } from '../../types'
import { getAllAuditions } from '../../api/audition'

import { TopPageHeader } from '../organisms/header/pcResponsive/TopPageHeader'
import { TopPageSmartPhoneHeader } from '../organisms/header/smartPhoneResponsive/TopPageSmartPhoneHeader'
import { PcResponsive } from '../responsive/audition/index/PcResponsive'
import { SmartPhoneResponsive } from '../responsive/audition/index/SmartPhoneResponsive'

export const Auditions: VFC = memo(() => {
  const [isOpen, setIsOpen]           = useState(false)
  const [auditions, setAuditions]     = useState<Array<Audition>>([])

  const ChangeIsOpen = () => setIsOpen(true)

  useEffect(() => {
    getAllAuditions()
    .then((res) => {
      setAuditions(res.data)
    })
  }, [])

  return (
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
  )
})
