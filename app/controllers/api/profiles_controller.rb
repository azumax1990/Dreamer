class ::Api::ProfilesController < ApplicationController

  def show
    user = User.find(params[:id])
    profile = user.prepare_profile(user)
    messages    = []
    profiles    = []
    group_users = []
    groups = user.groups
    groups.each do |group|
      group_users << group.group_users
      group.profiles(profiles, group)
      group.last_messages(messages, group)
    end

    group_members = []
    group_users.each do |group_user|
      group_members << group_user[0]
      group_members << group_user[1]
    end
    render json: { profile: profile, groups: groups, group_members: group_members, messages: messages, profiles: profiles }, methods: [:avatar_url]
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