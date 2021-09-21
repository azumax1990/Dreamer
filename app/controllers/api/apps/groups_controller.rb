class ::Api::Apps::GroupsController < ApplicationController

  # def index
  #   user = user.find(params[:id])
  #   groups = user.groups
  #   render json: groups
  # end

  def create
    group = Group.create
    GroupUser.create(user_id: params[:userId], group_id: group.id)
    GroupUser.create(user_id: params[:profileId], group_id: group.id)
    render json: group
  end

  private
  def group_params
    params.require(:group).permit(:userId, :profileId)
  end
end