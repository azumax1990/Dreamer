class ::Api::ProfilesController < ApplicationController

  def show
    user          = User.find(params[:id])
    profile       = user.prepare_profile(user)
    groups        = user.groups
    group_members = user.all_group_users(user)
    messages      = user.last_messages(user)
    profiles      = user.all_profiles(user)
    auditions     = user.auditions
    render json: { profile: profile, groups: groups, group_members: group_members, messages: messages, profiles: profiles, auditions: auditions }, methods: [:avatar_url]
  end

  def edit
    user = User.find(params[:id])
    profile = user.prepare_profile(user)
    render json: profile
  end

  def update
    user = User.find(params[:id])
    profile = user.prepare_profile(user)
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
    params.permit(:job, :name, :age, :gender, :tall, :prefecture, :introduction, :avatar, :company, :description)
  end
end