class ::Api::Apps::ApplicationController < ApplicationController
  before_action :authenticate_user!
end