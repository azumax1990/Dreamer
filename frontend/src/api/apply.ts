import axios from "axios"
import { ApplyParams } from "../types"
import { DEFAULT_API } from "../url/indx"

// オーディション応募
export const postApply = (audition_id: string, params: ApplyParams) => {
  return axios.post(`${DEFAULT_API}/api/auditions/${audition_id}/applies`, {
    user_id: params.user_id
  })
}

// 応募削除
export const deleteApply = (audition_id: string, id: number | undefined) => {
  return axios.delete(`${DEFAULT_API}/api/auditions/${audition_id}/applies/${id}`)
}