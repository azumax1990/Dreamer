import axios from "axios"
import { paramsPost } from "../types"

// 投稿一覧取得
export const getAllImages = (id: number | string) => {
  return axios.get(`http://localhost:3000/api/posts/${id}`)
}

// 写真投稿
export const PostImages = (params: paramsPost) => {
  return axios.post("http://localhost:3000/api/posts", params)
}