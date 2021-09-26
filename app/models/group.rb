class Group < ApplicationRecord
  include Rails.application.routes.url_helpers
  
  has_many :messages, dependent: :destroy
  has_many :group_users, dependent: :destroy
  has_many :users, through: :group_users
  has_one_attached :avatar

  def avatar_url
    avatar.attached? ? url_for(avatar) : nil
  end

  def profiles(profiles, group)
    profiles << group.users[0].profile
    profiles << group.users[1].profile
    return profiles
  end

  def last_messages(messages, group)
      if group.messages
        messages << group.messages.last
      end
    return messages
  end
end
