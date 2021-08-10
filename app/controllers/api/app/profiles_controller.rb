class ::Api::App::ProfilesController < ApplicationController
  def show
    profile = current_api_user.profile
    render json: profile
  end

  def edit
    profile = current_api_user.prepare_profile
  end

  def updata
    profile = current_api_user.prepare_profile
    profile.assign_attributes(profile_params)
    profile.save
    render json: { status: "ok"}
  end

  private
  def profile_params
    params.require(:profile).permit(:name, :age, :gender, :tall, :prefecture, :introduction, :avatars: [])
  end
end