class ::Api::AppliesController < ApplicationController

  def create
    audition = Audition.find(params[:audition_id])
    audition.applies.create(apply_params)
    render json: { status: 'ok' }
  end

  def destroy
    audition = Audition.find(params[:audition_id])
    apply = audition.applies.find_by(user_id: params[:id])
    apply.destroy
    render json: { status: 'ok' }
  end

  private
  def apply_params
    params.require(:apply).permit(:user_id)
  end
end