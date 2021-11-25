import React, { VFC } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'

const BackPageText = styled.p`
`

export const Page404: VFC = () => {
  const history = useHistory()
  const onClickBackPage = () => history.goBack()

  return (
    <>
      <BackPageText>404PageError</BackPageText>
      <BackPageText onClick={onClickBackPage}>戻る</BackPageText>
    </>
  )
}
