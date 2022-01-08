# 名前
  Dreamer
  俳優や歌手、モデルなどを目指す人と、事務所、制作会社、イベント会社などをつなげるマッチングアプリです。
# URL
  アプリURL 只今メンンテナンス中です
<!--   http://dreamer.com.s3-website-ap-northeast-1.amazonaws.com -->
  * ゲストログイン1 Email: user2@example.com, password: password をご使用ください。
  * ゲストログイン2 Email: user1@example.com, password: password をご使用ください。
# 開発環境
  * Ruby
  * Ruby on Rails(APIモード)
  * JavaScript
  * React
  * Typescript
  * Mysql
  * Nginx
  * Puma
  * AWS（VPC EC2 RDS S3）
  * RSpec

# 機能一覧
  * ユーザー登録、ログイン機能、ログアウト機能（devise_token_auth）
  * プロフィール編集機能(画像プレビュー機能有)
  * 写真投稿、削除機能（active_storage）(画像プレビュー機能有)
  * オーディション投稿、削除機能（active_storage）(画像プレビュー機能有)
  * オーディション応募機能
  * メッセージ機能

# 工夫した点
 * フロントエンドにReactを使用し完全SPA化したこと
 * Typescript化したこと
 * レスポンシブ（スマホ用）に対応している

# 今後の課題
 * Reduxの導入
 * devise_token_authのcurrent_userメソッドの使用
 * テストを十分に書く
 * active_model_serializersの導入
 * Mailerの導入
 * ユーザー、オーディション等の検索機能
 * ReactのデプロイにCloud Front, Route53を使用する
