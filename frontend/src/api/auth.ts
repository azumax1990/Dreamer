import axios from "axios";
import Cookies from "js-cookie"
import { SignUp, SignIn } from "../types/index";

// 新規登録
export const signUp = (params: SignUp) => {
  return axios.post("http://localhost:3001/api/auth", params)
}

// ログイン
export const signIn = (params: SignIn)  => {
  return axios.post("http://localhost:3001/api/auth/sign_in", params)
}

// ログアウト
export const signOut = () => {
  return axios.delete("http://localhost:3001/api/auth/sign_out", { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})  
}

// ログインユーザーを取得
export const getCurrentUser = () => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return
  return axios.get("http://localhost:3001/api//auth/sessions", { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }})
}