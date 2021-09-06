class ::Api::Apps::PostsController < ApplicationController

  def show
    user = User.find(params[:id])
    posts = user.posts.order(id: "DESC")
    render json: posts, methods: [:image_url]
  end

  def create
    user = User.find(params[:id])
    post = user.posts.new(content: params[:content])
    if params[:image][:data] != ""
      post.image.attach(io: StringIO.new(decode(params[:image][:data]) + "\n"),
                            filename: params[:image][:name])
    end
    post.save
    render json: { status: 'ok' }
  end

  def destroy
    post = current_api_user.posts.find(params[:id])
    post.destroy
    render json: { status: 'ok' }
  end

  def decode(str)
    Base64.decode64(str.split(',').last)
  end

  private
  def post_params
    params.require(:post).permit(:content, :image, :id)
  end
end