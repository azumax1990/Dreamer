# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User
  include Rails.application.routes.url_helpers

  has_many :posts, dependent: :destroy
  has_many :auditions, dependent: :destroy
  has_many :messages, dependent: :destroy
  has_many :group_users, dependent: :destroy
  has_many :groups, through: :group_users
  has_many :applies,  dependent: :destroy
  has_many :applied_auditions, through: :applies, source: :audition
  has_one :profile, dependent: :destroy
  has_one_attached :avatar
  
  def avatar_url
    avatar.attached? ? url_for(avatar) : nil
  end

  def prepare_profile(user)
    if user.profile
      return user.profile
      else
        profile = user.build_profile(user_id: user.id)
        profile.save
        return profile
    end
  end

  def all_group_users(user)
    group_users = []
    groups = user.groups
    groups.each do |group|
      group_users << group.group_users
    end
    group_members = []
    group_users.each do |group_user|
      group_members << group_user[0]
      group_members << group_user[1]
    end
    return group_members
  end

  def last_messages(user)
    messages = []
    groups = user.groups
    groups.each do |group|
      if group.messages
        messages << group.messages.last
      end
    end
    return messages
  end

  def all_profiles(user)
    profiles = []
    groups = user.groups
    groups.each do |group|
      profiles << group.users[0].profile
      profiles << group.users[1].profile
    end
    return profiles
  end
end
