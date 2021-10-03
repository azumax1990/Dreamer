class Audition < ApplicationRecord
  include Rails.application.routes.url_helpers

  belongs_to :user
  has_many :applies, dependent: :destroy
  has_many :applied_users, through: :applies, source: :user
  has_one_attached :image
  has_one_attached :avatar


  def image_url
    image.attached? ? url_for(image) : nil
  end
  def avatar_url
    avatar.attached? ? url_for(avatar) : nil
  end

  
end
