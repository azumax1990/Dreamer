import axios from "axios"
import { MessageParams } from "../types"

// メッセージ一覧取得
export const getAllMessages = (id: string) => {
  return axios.get(`http://localhost:3000/api/groups/${id}/messages`)
}

// メッセージ作成
export const postMessage = (params: MessageParams) => {
  return axios.post(`http://localhost:3000/api/groups/:group_id/messages`, params)
}