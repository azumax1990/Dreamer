class ::Api::Apps::PostsController < ApplicationController

  def index
    user = User.find(params[:id])
    posts = user.posts
    render json: posts
  end

  def create
    post = current_api_user.posts.build(post_params)
    post.save
    render json: { status: 'ok' }
  end

  def destroy
    post = current_api_user.posts.find(params[:id])
    post.destroy
    render json: { status: 'ok' }
  end

  private
  def post_params
    params.require(:post).permit(:content, :image)
  end
end