class SessionsController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only => [:create]

  def create
  	auth = JSON.parse(RestClient.post 'https://rpxnow.com/api/v2/auth_info', :token => params[:token], :apiKey => RPX_API_KEY)
  	current_user = User.find_by_identifier(auth['profile']['identifier'])
  	if current_user == nil
  		new_user = User.create(
  			:identifier => auth['profile']['identifier'],
  			:first_name => auth['profile']['name']['givenName'],
  			:last_name => auth['profile']['name']['familyName'],
  			:email => auth['profile']['email'] 
  		)
  		new_user.save
  		current_user = new_user
  	else
  		session[:id] = current_user.id
  	end
  	redirect_to root_url
  end

  def destroy
  	# remove the user's ID from the session
  	# redirect to the home page
  end
end
