import { ChangeEvent, useCallback, useContext, useState } from 'react'
import { LoginUserContext } from '../App'
import { paramsPost, Post } from '../types'

export const usePostImages = () => {
  const [content, setContent] = useState('')
  const [image, setImage]     = useState({data: '', name: ''})
  const { currentUser }       = useContext(LoginUserContext)
  
  const params: paramsPost = {
    content: content,
    image: image,
    id: currentUser?.id
  }

  const post: Post = {
    content: content,
    image_url: image.data,
  }

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

  const resetImage = useCallback(() => {
    setImage({ data: '', name: ''})
  }, [])
  return { content, setContent, image, resetImage, params, onChangeImage, post }
}
