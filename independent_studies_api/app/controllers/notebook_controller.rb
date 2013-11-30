class NotebookController < ApplicationController
  def index
  	user = User.find(session[:id])
  	@response = {'notebook' => []}
  	user.enrollments.each do |e|
  		e_hash = {}
  		e_hash['id'] = e.id
  		e_hash['title'] = e.course.title
  		e_hash['percentage'] = e.percentage
  		@response['notebook'] << e_hash
  	end
  	render json: @response
  end

  def detail
  end
end
