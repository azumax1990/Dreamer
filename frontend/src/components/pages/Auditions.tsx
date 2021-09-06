import React, { memo, useContext, VFC } from 'react'
import { LoginUserContext } from '../../App'
import { TopPageHeader } from '../organisms/header/pcResponsive/TopPageHeader'


export const Auditions: VFC = memo(() => {
  const { currentUser } = useContext(LoginUserContext)
  
  return (
    <>
      <TopPageHeader />
      auditionページ
      {currentUser ? (
        <>
          <p>{currentUser.id}</p>
          <p>{currentUser.email}</p>
        </>
        
      ) : (
        <p>ログインしてません</p>
      )}
    </>
  )
})
