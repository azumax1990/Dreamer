class ::Api::AuditionsController < ApplicationController

  def index
    auditions = Audition.all.order(id: "DESC")
    render json: auditions
  end

  def create
    user = User.find(params[:id])
    user.auditions.create(title: params[:title], description: params[:description])
    render json: { status: 'ok' }
  end

  def edit
    
  end

  def destroy
  end

  private
  def audition_params
    params.require(:audition).permit(:title, :description, :id)
  end
end