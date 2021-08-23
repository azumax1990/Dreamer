import axios from "axios"
import { ParamsProfile } from "../types"

// プロフィール詳細
export const getUserProfile = (id: string) => {
  return axios.get(`http://localhost:3000/api/profiles/${id}`)
}

// 編集プロフィール取得
export const getEditProfile = (id: number) => {
  return axios.get(`http://localhost:3000/api/profiles/${id}/edit`)
}

// プロフィール作成
export const PostProfile = (params: ParamsProfile) => {
  return axios.put(`http://localhost:3000/api/profiles/${params.id}`, params)
}


