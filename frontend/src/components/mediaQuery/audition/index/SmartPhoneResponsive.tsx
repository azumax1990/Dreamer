import React, { VFC, memo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Audition } from '../../../../types'
import { AuditionSmartPhoneInfo } from '../../../organisms/audition/smartPhoneResponsive/AuditionSmartPhoneInfo'

const AuditionsWrapper = styled.div`
  padding: 30px 20px;
  min-height: 100vh;
`
const AuditionsContainer = styled.div`
  background-color: #fff;
  width: 100%;
  height: 700px;
  margin: 0 auto;
`
type Props = {
  auditions: Array<Audition>;
}
export const SmartPhoneResponsive: VFC<Props> = memo((props) => {
  const { auditions } = props;
  return (
    <AuditionsWrapper>
      <AuditionsContainer>
        {auditions.map((audition) => (
          <Link to={`/audition/${audition.id}`} key={audition.id} style={{ color: "black", textDecoration: "none"}}>
            <AuditionSmartPhoneInfo audition={audition}/>
          </Link>
        ))}
      </AuditionsContainer>
    </AuditionsWrapper>
  )
})
