import React, { memo, useContext, VFC } from 'react'
import { LoginUserContext } from '../../App'


export const Auditions: VFC = memo(() => {
  const { currentUser } = useContext(LoginUserContext)
  
  return (
    <>
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
