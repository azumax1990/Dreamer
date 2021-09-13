import { ChangeEvent, useCallback, useContext, useState } from "react"
import { LoginUserContext } from "../App"
import { AuditionParams } from "../types"

export const usePostAudition = () => {
  const [title, setTitle]             = useState('')
  const [image, setImage]             = useState({data: '', name: ''})
  const [description, setDescription] = useState('')
  const { currentUser }               = useContext(LoginUserContext)

  const onChangeImage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const reader = new FileReader()
      const file = e.target.files[0];
      reader.onload = () => { 
        setImage({
          data: reader.result as string,
          name: file.name
        })
      }
      reader.readAsDataURL(file)
    }
  }, [setImage])

  const params: AuditionParams = {
    id: currentUser?.id,
    title: title,
    description: description,
    image: image
  }

  return { onChangeImage, params, title, setTitle, description, setDescription, image, setImage }
}
