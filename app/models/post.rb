class Post < ApplicationRecord
  belongs_to :user
  has_one_attached :image

  def image_url
    image.attached? ? url_for(image) : nil
  end
end
