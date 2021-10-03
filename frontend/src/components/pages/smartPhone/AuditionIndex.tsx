import React, { memo, VFC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { getUserProfile } from '../../../api/profile'
import { Audition } from '../../../types'
import { AuditionInfo } from '../../Molecules/audition/smartphoneResponsive/AuditionInfo'
import { MessagePageSmartPhoneHeader } from '../../organisms/header/smartPhoneResponsive/MessagePageSmartPhoneHeader'

const AuditionWrapper = styled.div`
  width: 340px;
  margin: 30px auto;
  padding: 20px 0;
  border-radius: 10px;
  box-shadow: 0 0 5px gray;

`
const AuditionInfos = styled.div`
`
const AuditionsContainer = styled.div`
  padding: 10px;
  height: 600px;
  overflow: scroll;
`
const TitleText = styled.h2`
  margin: 0;
  text-align: center;
`

type Props = {
  id: string;
}
export const AuditionIndex: VFC<Props> = memo((props) => {
  const { id } = props;
  const [auditions, setAuditions] = useState<Array<Audition>>([])

  useEffect(() => {
    getUserProfile(id)
    .then((res) => {
      setAuditions(res.data.auditions)
    })
  }, [])
  return (
    <>
      <MessagePageSmartPhoneHeader />
      <AuditionWrapper>
        <TitleText>募集リスト</TitleText>
        <AuditionsContainer>
          {auditions.map((audition) => (
            <AuditionInfos key={audition.id}>
              <AuditionInfo audition={audition} />
            </AuditionInfos>
          ))}
        </AuditionsContainer>
      </AuditionWrapper>
    </>
  )
})
