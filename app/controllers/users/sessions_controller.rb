class Users::SessionsController < Devise::SessionsController
  respond_to :json

  def show_current_user
    reject_if_not_authorized_request!
    render status: 200,
          json: {
            success: true,
            info: "Current user",
            user: current_user
          }
  end

  def failure
    render status: 401,
          json: {
            success: false,
            info: "Unauthorized"
          }
  end

  private

  def reject_if_not_authorized_request!
    warden.authenticate!(
      scope: resource_name, 
      recall: "#{controller_path}#failure")
  end
end