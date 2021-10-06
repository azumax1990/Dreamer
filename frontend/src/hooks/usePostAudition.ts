import { ChangeEvent, useCallback, useContext, useState } from "react"
import { LoginUserContext } from "../App"
import { AuditionParams } from "../types"

export const usePostAudition = () => {
  const [title, setTitle]             = useState('')
  const [avatar, setAvatar]             = useState({data: '', name: ''})
  const [description, setDescription] = useState('')
  const { currentUser }               = useContext(LoginUserContext)

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

  const params: AuditionParams = {
    id: currentUser?.id,
    title: title,
    description: description,
    avatar: avatar
  }
  const resetImage = useCallback(() => {
    setAvatar({ data: '', name: ''})
  }, [])

  return { onChangeImage, params, title, setTitle, description, setDescription, avatar, resetImage, setAvatar }
}
