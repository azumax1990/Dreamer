import axios from "axios"
import { MessageParams } from "../types"
import { DEFAULT_API } from "../url/indx"

// メッセージ一覧取得
export const getAllMessages = (id: string) => {
  return axios.get(`${DEFAULT_API}/api/groups/${id}/messages`)
}

// メッセージ作成
export const postMessage = (group_id: string, params: MessageParams) => {
  return axios.post(`${DEFAULT_API}/api/groups/${group_id}/messages`, params)
}