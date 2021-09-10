import React, { memo, useState, useEffect, VFC } from 'react'
import styled from 'styled-components'

import { Audition } from '../../types'
import { getAllAuditions } from '../../api/audition'

import { TopPageHeader } from '../organisms/header/pcResponsive/TopPageHeader'
import { AddAuditionModal } from '../organisms/audition/AddAuditionModal'
import { AuditionInfo } from '../organisms/audition/AuditionInfo'
import { Link } from 'react-router-dom'

const AuditionsWrapper = styled.div`
  padding: 40px 0;
  background-color: #F5F5F5;
  min-height: 100vh;
`
const AuditionsContainer = styled.div`
  background-color: #fff;
  width: 700px;
  margin: 0 auto;
`

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
      <TopPageHeader ChangeIsOpen={ChangeIsOpen} />
      <AuditionsWrapper>
        <AuditionsContainer>
          {auditions.map((audition) => (
            <Link to={`/audition/${audition.id}`} key={audition.id} style={{ color: "black", textDecoration: "none"}}>
              <AuditionInfo audition={audition} />
            </Link>
          ))}
        </AuditionsContainer>
        {isOpen ? (
          <AddAuditionModal setIsOpen={setIsOpen} auditions={auditions} setAuditions={setAuditions}/>
        ): (null)}
      </AuditionsWrapper>
    </>
  )
})
