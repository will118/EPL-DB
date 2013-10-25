class Users::UsersController < Devise::SessionsController
  respond_to :json

  def is_user
    reject_if_not_authorized_request!
    render status: 200,
    json: {
      success: !User.find_by_name(params[:name]).blank?
    }
  end

  def update
    @user = User.find(current_user.id)

    if @user.nil?
      logger.info("User not found.")
      render :status => 404, :json => {:status => "error", :errorcode => "11009", :message => "Invalid userid."}
    else
      @user.update_attributes(params.permit(:settings, :name, :email))
      render :status => 200, :json => {:status => "success", :user => @user, :message => "The user has been updated"}
    end
  end

  def safe_params
    params.require(:user).permit(:settings)
  end

  private

  def reject_if_not_authorized_request!
    warden.authenticate!(
      scope: resource_name,
    recall: "#{controller_path}#failure")
  end
end