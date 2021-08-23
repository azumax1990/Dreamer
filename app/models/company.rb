class Company < ApplicationRecord

  belongs_to :user
  has_one_attached :avatar
  
  def avatar_url
    avatar.attached? ? url_for(avatar) : nil
  end
end
