import React, { SetStateAction, VFC, memo, Dispatch } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Audition } from '../../../../types'
import { AddAuditionModal } from '../../../organisms/audition/pcResponsive/AddAuditionModal'
import { AuditionInfo } from '../../../organisms/audition/pcResponsive/AuditionInfo'

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
type Props = {
  auditions: Array<Audition>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setAuditions: Dispatch<SetStateAction<Array<Audition>>>;
}
export const PcResponsive: VFC<Props> = memo((props) => {
  const { auditions, isOpen, setIsOpen, setAuditions  } = props;
  return (
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
  )
})
