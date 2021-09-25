class ::Api::Apps::ProfilesController < ApplicationController

  def show
    user = User.find(params[:id])
    profile = user.prepare_profile

    groups = user.groups
    messages    = []
    profiles    = []
    group_users = []
    groups.each do |group|
      group_users << group.group_users
      profiles    << group.users[0].profile
      profiles    << group.users[1].profile
      if group.messages
        messages << group.messages.last
      end
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
    params.permit(:job, :name, :age, :gender, :tall, :prefecture, :introduction, :avatar, :company, :description)
  end
end