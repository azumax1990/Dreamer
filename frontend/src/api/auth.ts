import axios from "axios";
import Cookies from "js-cookie"
import { SignUpType, SignInType } from "../types" 
import { DEFAULT_API } from "../url/indx"

// 新規登録API
export const signUp = (params: SignUpType) => {
  return axios.post(`${DEFAULT_API}/api/auth`, {
    email: params.email,
    password: params.password,
    password_confirmation: params.passwordConfirmation
  })
}

// ログインAPI
export const signIn = (params: SignInType)  => {
  return axios.post(`${DEFAULT_API}/api/auth/sign_in`, params)
}

// ログアウトAPI
export const signOut = () => {
  return axios.delete(`${DEFAULT_API}/api/auth/sign_out`, { headers: {
    "access-token": Cookies.get("access-token"),
    "client": Cookies.get("client"),
    "uid": Cookies.get("uid")
  }})
}

// ログインユーザーを取得API
export const getCurrentUser = () => {
  if (!Cookies.get("access-token") || !Cookies.get("client") || !Cookies.get("uid")) return
  return axios.get(`${DEFAULT_API}/api/auth/sessions`, { headers: {
    "access-token": Cookies.get("access-token"),
    "client": Cookies.get("client"),
    "uid": Cookies.get("uid")
  }})
}