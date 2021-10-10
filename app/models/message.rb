class Message < ApplicationRecord
  include Rails.application.routes.url_helpers

  validates :content, presence: true

  belongs_to :group
  belongs_to :user
  has_one_attached :avatar

  def avatar_url
    avatar.attached? ? url_for(avatar) : nil
  end
end
