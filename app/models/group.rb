class Group < ApplicationRecord
  include Rails.application.routes.url_helpers
  
  has_many :messages, dependent: :destroy
  has_many :group_users, dependent: :destroy
  has_many :users, through: :group_users
  has_one_attached :avatar

  def avatar_url
    avatar.attached? ? url_for(avatar) : nil
  end
end
