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
  	user = User.find(session[:id])
  	detail = {}
  	enrollment = Enrollment.find(params[:enrollment_id])
  	detail['enrollment_id'] = enrollment.id
  	detail['percentage'] = enrollment.percentage
  	detail['title'] = enrollment.course.title
  	detail['description'] = enrollment.course.description
    detail['url'] = enrollment.course.url
    detail['advancements'] = []
    enrollment.advancements.each do |a|
    	a_hash = {}
    	a_hash['timestamp'] = a.created_at.strftime('%D')
    	a_hash['amount'] = a.amount
    	detail['advancements'] << a_hash
    end
    detail['advancements'].reverse!
    detail['notes'] = []
    enrollment.notes.each do |n|
    	n_hash = {}
    	n_hash['timestamp'] = n.created_at.strftime('%D')
    	n_hash['text'] = n.text
    	n_hash['title'] = n.title
    	detail['notes'] << n_hash
    end
  	@response = {}
  	@response['detail'] = detail

  	render json: @response
  end
end
