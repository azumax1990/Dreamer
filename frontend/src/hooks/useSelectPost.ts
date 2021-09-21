import { useCallback, useState } from 'react'
import { Post } from '../types'

type Props = {
  id:    number | undefined;
  posts: Array<Post>;
}

export const useSelectPost = () => {
  const [selectedPost, setSelectedPost] = useState<Post>()
  const [modalOpen, setModalOpen]       = useState(false)
  
  const onSelectedPost = useCallback((props: Props) => {
    const { id, posts } = props;
    const selectPost = posts.find((post) => post.id === id )
    setSelectedPost(selectPost)
    setModalOpen(true)
  }, [])

  return { onSelectedPost, selectedPost, modalOpen, setModalOpen }
}
