import React, { memo, VFC } from 'react'
import styled from 'styled-components'
import { FaAngleDoubleLeft } from "react-icons/fa"
import { useHistory } from 'react-router-dom'

const HeaderWrapper = styled.header`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px #cccccc solid;
  margin: 0;
`
export const MessagePageSmartPhoneHeader: VFC = memo(() => {
  const history = useHistory()
  const onClickBackPage = () => history.goBack()
  return (
    <>
      <HeaderWrapper>
        <FaAngleDoubleLeft style={{ fontSize: "30px", cursor: "pointer" }} onClick={onClickBackPage}/>
      </HeaderWrapper>
    </>
  )
})
