// サインアップ
export type SignUpType = {
  email:                string;
  password:             string;
  passwordConfirmation: string;
}

// サインイン
export type SignInType = {
  email:    string;
  password: string;
}

// ユーザー
export type User = {
  id:                  number;
  uid:                 string;
  provider:            string;
  email?:               string;
  name?:               string;
  nickname?:           string;
  image?:              string;
  allowPasswordChange: boolean;
  created_at:          Date;
  updated_at:          Date;
}

// プロフィール
export type Profile = {
  id:            number;
  user_id:       number;
  name?:         string;
  job:           string;
  avatar_url:    string;
  gender?:       string;
  age?:          number;
  tall?:         number;
  prefecture?:   string;
  introduction?: string;
  company?:      string;
  description?:  string;
  created_at:    Date;
  updated_at:    Date;
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

// Post
export type Post = {
  id?:         number;
  user_id?:    number;
  content:     string;
  image_url:   string;
  created_at?: Date;
  updated_at?: Date;
}

// Post投稿
export type paramsPost = {
  id:      number | undefined;
  content: string;
  image:   {};
}

// audition
export type Audition = {
  id:          number;
  user_id?:    number;
  title:       string;
  description: string;
  avatar_url?:  string;
  created_at?: Date;
  updated_at?: Date;
}

// audition作成
export type AuditionParams = {
  id:          number | undefined;
  title:       string;
  description: string;
  avatar:       {};
}

// group
export type Group = {
  id:         number;
  created_at: Date;
  updated_at: Date;
}

// group_user取得
export type GroupUser = {
  id:         number;
  user_id:    number;
  group_id:   number;
  created_at: Date;
  updated_at: Date;
}

// group_user作成
export type GroupUserParams = {
  userId:    number | undefined;
  profileId: number | undefined;
}

// message
export type Message = {
  id:         number;
  content:    string;
  user_id:    number;
  group_id:   number;
  created_at: Date;
  updated_at: Date;
}

// message作成
export type MessageParams = {
  user_id:  number | undefined;
  group_id: number | string;
  content:  string;
}

// apply作成
export type ApplyParams = {
  user_id:     number | undefined;
}

