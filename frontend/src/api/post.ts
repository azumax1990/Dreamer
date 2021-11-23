import axios from "axios"
import { paramsPost } from "../types"
import { DEFAULT_API } from "../url/indx"

// 投稿一覧取得
export const getAllImages = (id: number | string) => {
  return axios.get(`${DEFAULT_API}/api/posts/${id}`)
}

// 写真投稿
export const PostImages = (params: paramsPost) => {
  return axios.post(`${DEFAULT_API}/api/posts`, params)
}

// 写真削除
export const deleteImages = (id: number | undefined) => {
  return axios.delete(`${DEFAULT_API}/api/posts/${id}`)
}