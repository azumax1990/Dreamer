import { ChangeEvent, useCallback, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getEditProfile, PostProfile } from '../api/profile'
import { LoginUserContext } from '../App'
import { ParamsProfile } from '../types'

export const useEditProfile = () => {
  const [job, setJob]                   = useState('演者')
  const [name, setName]                 = useState('')
  const [avatar, setAvatar]             = useState({data: '', name: ''})
  const [age, setAge]                   = useState<number>()
  const [gender, setGender]             = useState('')
  const [tall, setTall]                 = useState<number>()
  const [prefecture, setPrefecture]     = useState('')
  const [introduction, setIntroduction] = useState('')
  const [company, setCompany]           = useState('')
  const [description, setDescription]   = useState('')

  const { currentUser } = useContext(LoginUserContext)
  const history = useHistory()

  const getProfile = useCallback((id) => {
    getEditProfile(currentUser?.id || id)
    .then((res) => {
      setName(res.data.name)
      setAge(res.data.age)
      setGender(res.data.gender)
      setTall(res.data.tall)
      setPrefecture(res.data.prefecture)
      setIntroduction(res.data.introduction)
      setCompany(res.data.company)
      setDescription(res.data.description)
    })
    .catch(() => alert('エラー'))
  }, [currentUser?.id])

  const params: ParamsProfile = {
    id:           currentUser?.id,
    job:          job,
    name:         name,
    avatar:       avatar,
    age:          age, 
    gender:       gender,
    tall:         tall, 
    prefecture:   prefecture,
    introduction: introduction,
    company:      company,
    description:  description
  }

  // プロフィールデータ送信
  const onClickPostProfile = () => {
    PostProfile(params)
    .then((res) => (
      history.push(`/user/${currentUser?.id}/profile`)
    ))
    .catch(() => alert("プロフィールを更新できませんでした"))
  }

  // プロフィール写真更新
  const onChangeImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader()
      const file = e.target.files[0];
      reader.onload = () => { 
        setAvatar({
          data: reader.result as string,
          name: file.name
        })
      }
      reader.readAsDataURL(file)
    }
  }, [setAvatar])

  const resetImage = useCallback(() => {
    setAvatar({ data: '', name: ''})
  }, [])

  const onChangeJob = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setJob(e.target.value)
  }, [setJob])

  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }, [setName])

  const onChangeAge = useCallback((e: ChangeEvent<{ value: unknown }>) => {
    setAge(e.target.value as number)
  }, [setAge])

  const onChangeGender = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value)
  }, [setGender])

  const onChangeTall = useCallback((e: ChangeEvent<{ value: unknown }>) => {
    setTall(e.target.value as number)
  }, [setTall])

  const onChangePrefecture = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setPrefecture(e.target.value)
  }, [setPrefecture])

  const onChangeIntroduction = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setIntroduction(e.target.value)
  }, [setIntroduction])

  const onChangeCompany = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCompany(e.target.value)
  }, [setCompany])

  const onChangeDescription = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  }, [setDescription])

  return { 
           job,
           name,
           avatar,
           age,
           gender,
           tall,
           prefecture,
           introduction,
           company,
           description,
           setDescription,
           onClickPostProfile,
           onChangeImage,
           onChangeJob,
           onChangeName,
           onChangeAge,
           onChangeGender,
           onChangeTall,
           onChangePrefecture,
           onChangeIntroduction,
           onChangeCompany,
           onChangeDescription,
           resetImage,
           getProfile
  }
}
