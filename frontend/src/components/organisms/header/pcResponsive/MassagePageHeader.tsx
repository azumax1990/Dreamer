import React, { memo, VFC } from 'react'
import styled from 'styled-components'
import { FaAngleDoubleLeft } from "react-icons/fa"
import { useHistory } from 'react-router-dom'

const HeaderWrapper = styled.header`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  border-bottom: 1px #cccccc solid;
`
const HeaderLeftWrapper = styled.div`
`
export const MassagePageHeader: VFC = memo(() => {
  const history = useHistory()
  const onClickBackPage = () => history.goBack()
  return (
    <HeaderWrapper>
      <HeaderLeftWrapper onClick={onClickBackPage}>
        <FaAngleDoubleLeft style={{ fontSize: "30px", cursor: "pointer" }} />
      </HeaderLeftWrapper>
    </HeaderWrapper>
  )
})
