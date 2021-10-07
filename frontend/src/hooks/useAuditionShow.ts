import { useCallback, useContext, useState } from 'react'
import { ApplyParams, Audition, Profile, User } from '../types'
import { LoginUserContext } from '../App'
import { deleteAudition, getAudition } from '../api/audition'
import { deleteApply, postApply } from '../api/apply'
import { useHistory } from 'react-router-dom'

export const useAuditionShow = () => {
  const [audition, setAudition]         = useState<Audition>()
  const [profile, setProfile]           = useState<Profile>()
  const [appliedUsers, setAppliedUsers] = useState<Array<User>>([])

  const { currentUser } = useContext(LoginUserContext)
  const history         = useHistory()

  // オーディション情報取得
  const getAuditionShow = useCallback((id: string) => {
    getAudition(id)
    .then((res) => {
      setAudition(res.data.audition)
      setProfile(res.data.profile)
      setAppliedUsers(res.data.users)
    })
    .catch(() => alert('情報を取得出来ませんでした'))
  }, [])

  const hasApplied = appliedUsers.find((appliedUser) => appliedUser.id === currentUser?.id )

  // オーディション応募関数
  const onClickPostApply = useCallback((id: string) => {
    const params: ApplyParams = {
      user_id: currentUser?.id,
    }
    postApply(id, params)
    .then((res) => {
      alert('応募が完了しました。記載元からの連絡をお待ちください')
      history.push("/")
    })
  }, [currentUser?.id, history])

  // オーディション削除関数
  const onDeleteAudition = useCallback((id: string) => {
    deleteAudition(audition?.id)
    .then((res) => {
      if (res.data.status === 'ok') {
        history.push("/")
        alert("募集を終了しました。")
      }
    })
  }, [audition?.id, history])

  // オーディション応募削除関数
  const onDeleteApply = useCallback((id: string) => {
    deleteApply(id, currentUser?.id)
    .then((res) => {
      if (res.data.status === 'ok') {
        history.push("/")
        alert("応募を取り消しました。")
      }
    })
  }, [currentUser?.id, history])

  return {getAuditionShow, onClickPostApply, onDeleteAudition, onDeleteApply, audition, profile, hasApplied}  
}
