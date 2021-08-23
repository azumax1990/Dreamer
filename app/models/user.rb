# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_one :profile, dependent: :destroy
  has_one :company, dependent: :destroy

  def prepare_profile
    profile || build_profile
  end

  def prepare_company
    company || build_company
  end
end
