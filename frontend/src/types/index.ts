// サインアップ
export type SignUpType = {
  email: string;
  password: string;
  passwordConfirmation: string;
}

// サインイン
export type SignInType = {
  email:    string;
  password: string;
}

// ユーザー
export type User = {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name?: string;
  nickname?: string;
  image?: string;
  allowPasswordChange: boolean;
  created_at: Date;
  updated_at: Date;
}
// プロフィール
export type Profile = {
  id?: number;
  user_id?: number;
  name?: string;
  job: string;
  avatar_url: string;
  gender?: string;
  age?: number;
  tall?: number;
  prefecture?: string;
  introduction?: string;
  company?:      string;
  description?:  string;
  created_at?: Date;
  updated_at?: Date;
}

// プロフィール更新
export type ParamsProfile = {
  id:           number | undefined;
  name:         string | undefined;
  job:          string;
  age:          number | undefined;
  gender:       string | undefined;
  tall:         number | undefined;
  prefecture:   string | undefined;
  introduction: string | undefined;
  avatar:       {} | undefined;
  company:      string | undefined;
  description:  string | undefined;
}

export type Post = {
  id?: number;
  user_id?: number;
  content?: string;
  image_url?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type paramsPost = {
  id: number | undefined;
  content: string;
  image: {};
}