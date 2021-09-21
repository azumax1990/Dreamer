class ::Api::AuditionsController < ApplicationController

  def index
    auditions = Audition.all.order(id: "DESC")
    render json: auditions, methods: [:image_url]
  end

  def show
    audition = Audition.find(params[:id])
    profile = audition.user.profile
    render json: {audition: audition, profile: profile}
  end

  def create
    user = User.find(params[:id])
    audition = user.auditions.new(title: params[:title], description: params[:description])
    if params[:image][:data] != ""
      audition.image.attach(io: StringIO.new(decode(params[:image][:data]) + "\n"),
                            filename: params[:image][:name])
    end
    audition.save
    render json: { status: 'ok' }
  end

  def edit
    
  end

  def destroy
  end

  def decode(str)
    Base64.decode64(str.split(',').last)
  end

  private
  def audition_params
    params.require(:audition).permit(:title, :description, :id, :image, :user_id)
  end
end
