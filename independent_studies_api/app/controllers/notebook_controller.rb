class NotebookController < ApplicationController
  def index
  	user = User.find(session[:id])
  	@response = {'notebook' => []}
    puts user.enrollments
  	user.enrollments.each do |e|
      # skip completed courses
      next if e.percentage == 100
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
      set = []
      set << a.created_at.to_i * 1000 # convert to milliseconds for JS use
      set << a.amount
      detail['advancements'] << set
    end
    detail['notes'] = []
    enrollment.notes.order(:id).reverse.each do |n|
    	n_hash = {}
    	n_hash['timestamp'] = n.created_at.strftime('%D')
    	n_hash['text'] = n.text
    	n_hash['title'] = n.title
      n_hash['id'] = n.id
    	detail['notes'] << n_hash
    end
  	@response = {}
  	@response['detail'] = detail

  	render json: @response
  end
end
