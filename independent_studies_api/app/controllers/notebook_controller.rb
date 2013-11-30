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
    # fake data - will be real in the future
  	detail['notes'] = [
  		{'timestamp' => (Time.now - 10000).strftime('%D'), 'text' => "I think I'm finally getting the hang of this!"},
  		{'timestamp' => (Time.now - 20000).strftime('%D'), 'text' => "Almost there ..."},
  		{'timestamp' => (Time.now - 40000).strftime('%D'), 'text' => "Learned some awesome new methods today!"},
  		{'timestamp' => (Time.now - 80000).strftime('%D'), 'text' => "Someday I will see my friends and family again."},
  		{'timestamp' => (Time.now - 160000).strftime('%D'), 'text' => "Hm, coding is sort of addictive."},
  		{'timestamp' => (Time.now - 320000).strftime('%D'), 'text' => "Should I be alarmed if I don't understand any of this?"},
  		{'timestamp' => (Time.now - 640000).strftime('%D'), 'text' => "About to get started. Hooray for coding journeys!"},
  	]
  	@response = {}
  	@response['detail'] = detail

  	render json: @response
  end
end
