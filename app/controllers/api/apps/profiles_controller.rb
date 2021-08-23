class ::Api::Apps::ProfilesController < ApplicationController
  def show
    user = User.find(params[:id])
    profile = user.prepare_profile
    render json: profile, methods: [:avatar_url]
  end

  def edit
    user = User.find(params[:id])
    profile = user.prepare_profile
    render json: profile
  end

  def update
    user = User.find(params[:id])
    profile = user.prepare_profile
    profile.assign_attributes(profile_params)
    if params[:avatar][:data] != ""
      profile.avatar.attach(io: StringIO.new(decode(params[:avatar][:data]) + "\n"),
                            filename: params[:avatar][:name])
    end
    profile.save
    render json: { status: "ok"}
  end

  def decode(str)
    Base64.decode64(str.split(',').last)
  end

  private
  def profile_params
    params.permit(:name, :age, :gender, :tall, :prefecture, :introduction, :avatar)
  end
end