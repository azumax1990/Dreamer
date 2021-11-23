import axios from "axios"
import { ParamsProfile } from "../types"
import { DEFAULT_API } from "../url/indx"

// プロフィール詳細
export const getUserProfile = (id: string) => {
  return axios.get(`${DEFAULT_API}/api/profiles/${id}`)
}

// 編集プロフィール取得
export const getEditProfile = (id: number | string) => {
  return axios.get(`${DEFAULT_API}/api/profiles/${id}/edit`)
}

// プロフィール作成
export const PostProfile = (params: ParamsProfile) => {
  return axios.put(`${DEFAULT_API}/api/profiles/${params.id}`, params)
}