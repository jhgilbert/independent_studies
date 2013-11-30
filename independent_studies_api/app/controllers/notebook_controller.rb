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
  	detail['percentage'] = enrollment.percentage
  	detail['description'] = enrollment.course.description
    
    # fake data - will be real in the future
  	detail['advancements'] = [
  		{'timestamp' => (Time.now - 10000), 'amount' => nil},
  		{'timestamp' => (Time.now - 20000), 'amount' => nil},
  		{'timestamp' => (Time.now - 40000), 'amount' => nil},
  		{'timestamp' => (Time.now - 80000), 'amount' => nil},
  		{'timestamp' => (Time.now - 160000), 'amount' => nil},
  	]
  	detail['notes'] = [
  		{'timestamp' => (Time.now - 10000), 'text' => "I think I'm finally getting the hang of this!"},
  		{'timestamp' => (Time.now - 20000), 'text' => "Almost there ..."},
  		{'timestamp' => (Time.now - 40000), 'text' => "Learned some awesome new methods today!"},
  		{'timestamp' => (Time.now - 80000), 'text' => "Someday I will see my friends and family again."},
  		{'timestamp' => (Time.now - 160000), 'text' => "Hm, coding is sort of addictive."},
  		{'timestamp' => (Time.now - 320000), 'text' => "Should I be alarmed if I don't understand any of this?"},
  		{'timestamp' => (Time.now - 640000), 'text' => "About to get started. Hooray for coding journeys!"},
  	]
  	@response = {}
  	@response['detail'] = detail

  	render json: @response
  end
end
