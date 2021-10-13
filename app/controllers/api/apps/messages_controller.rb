class ::Api::Apps::MessagesController < ApplicationController

  def index
    group = Group.find(params[:group_id])
    messages = group.messages
    profiles = []
    messages.each do |message|   
      profiles << message.user.profile
    end
    render json: { messages: messages, profiles: profiles }
  end

  def create
    group = Group.find(params[:group_id])
    message = group.messages.create(message_params)
    profile = message.user.profile
    render json: { message: message, profile: profile }
  end

  private
  def message_params
    params.require(:message).permit(:content, :user_id)
  end
end