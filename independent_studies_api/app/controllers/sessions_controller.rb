class SessionsController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => [:create]

  def create
  	auth = RestClient.post 'https://rpxnow.com/api/v2/auth_info', :token => params[:token], :apiKey => RPX_API_KEY
  	puts auth
  	redirect_to root_url
  end

  def destroy
  end
end
