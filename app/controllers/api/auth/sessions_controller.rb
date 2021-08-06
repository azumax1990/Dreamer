class Api::Auth::SessionsController < ApplicationController
  # ログイン状態確認用コントローラー
  def index
    if current_api_user
      render json: { is_login: true, user: current_api_user }
    else
      render json: { is_login: false, message: "ユーザーが存在しません" }
    end
  end
end