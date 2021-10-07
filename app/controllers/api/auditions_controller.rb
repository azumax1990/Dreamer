class ::Api::AuditionsController < ApplicationController

  def index
    auditions = Audition.all.order(id: "DESC")
    render json: auditions, methods: [:avatar_url]
  end

  def show
    audition = Audition.find(params[:id])
    profile = audition.user.profile
    users = audition.applied_users
    applied_profiles =[]
    users.each do |user|
      applied_profiles << user.profile
    end
    render json: { audition: audition, profile: profile, users: users, applied_profiles: applied_profiles }, methods: [:avatar_url]
  end

  def create
    user = User.find(params[:id])
    audition = user.auditions.new(title: params[:title], description: params[:description])
    if params[:avatar][:data] != ""
      audition.avatar.attach(io: StringIO.new(decode(params[:avatar][:data]) + "\n"),
                            filename: params[:avatar][:name])
    end
    audition.save
    render json: audition, methods: [:avatar_url]
  end

  def edit
    
  end

  def destroy
    audition = Audition.find(params[:id])
    audition.destroy
    render json: { status: 'ok' }
  end

  def decode(str)
    Base64.decode64(str.split(',').last)
  end

  private
  def audition_params
    params.require(:audition).permit(:title, :description, :id, :avatar, :user_id)
  end
end
