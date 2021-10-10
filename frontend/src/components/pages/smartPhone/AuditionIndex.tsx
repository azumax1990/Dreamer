import React, { memo, VFC, useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { getUserProfile } from '../../../api/profile'
import { LoginUserContext } from '../../../App'
import { Audition } from '../../../types'

import { AuditionInfo } from '../../Molecules/audition/smartphoneResponsive/AuditionInfo'
import { MessagePageSmartPhoneHeader } from '../../organisms/header/smartPhoneResponsive/MessagePageSmartPhoneHeader'
import { Loading } from '../../organisms/loading/Loading'

const AuditionWrapper = styled.div`
  width: 340px;
  margin: 30px auto;
  padding: 20px 0;
  border-radius: 10px;
  box-shadow: 0 0 5px gray;
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
  const { loading, setLoading } = useContext(LoginUserContext)

  useEffect(() => {
    setLoading(true)
    getUserProfile(id)
    .then((res) => {
      setAuditions(res.data.auditions)
    })
    .catch(() => alert('読み込めませんでした'))
    .finally(() => setLoading(false))
  }, [id, setLoading])
  return (
    <>
      <MessagePageSmartPhoneHeader />
      <AuditionWrapper>
        <TitleText>募集リスト</TitleText>
        <AuditionsContainer>
          {loading ? (
            <Loading />
          ) : (
            <>
              {auditions.map((audition) => (
                <AuditionInfo audition={audition} key={audition.id}/>
              ))}
            </>
          )}
        </AuditionsContainer>
      </AuditionWrapper>
    </>
  )
})
