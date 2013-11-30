class SessionsController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => [:create]

  def index
  	@response = nil
  	if session[:id] == nil
  		@response = {"name" => nil}
  	else
      user = User.find(session[:id])
      fullName = user.first_name + " " + user.last_name
      @response = {"name" => user.first_name, "admin" => user.is_admin, "fullName" => fullName}
  	end
  	render json: @response
  end

  def create
  	auth = JSON.parse(RestClient.post 'https://rpxnow.com/api/v2/auth_info', :token => params[:token], :apiKey => RPX_API_KEY)
  	current_user = User.find_by_identifier(auth['profile']['identifier'])
  	if current_user == nil
  		new_user = User.create(
  			:identifier => auth['profile']['identifier'],
  			:first_name => auth['profile']['name']['givenName'],
  			:last_name => auth['profile']['name']['familyName'],
  			:email => auth['profile']['email'],
        :is_admin => false 
  		)
  		new_user.save
  		current_user = new_user
  	end
  	session[:id] = current_user.id
  	redirect_to "/"
  end

  def logout
  	session[:id] = nil
    @response = {'status' => 'success'}

    render json: @response
  end
end
