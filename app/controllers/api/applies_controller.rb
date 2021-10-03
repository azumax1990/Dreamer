class ::Api::AppliesController < ApplicationController

  def create
    audition = Audition.find(params[:audition_id])
    audition.applies.create(apply_params)
    render json: { status: 'ok' }
  end
  
  private
  def apply_params
    params.require(:apply).permit(:user_id)
  end
end