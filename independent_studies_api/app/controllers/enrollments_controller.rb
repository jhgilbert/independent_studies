class EnrollmentsController < ApplicationController
	def create
		@enrollment = Enrollment.new
		@enrollment.user_id = session[:id]
		@enrollment.course_id = params[:enrollment][:course_id]
		@enrollment.percentage = 0
		@enrollment.save
		render json: @enrollment
	end

	def transcript
		@response = {'transcript' => []}
		user = User.find(session[:id])
		enrollments = user.enrollments.where(:percentage => 100).preload(:course).load
		enrollments.each do |e|
			e_hash = {}
			e_hash['id'] = e.id
			e_hash['course_title'] = e.course.title
			e_hash['course_publisher'] = e.course.publisher
			e_hash['course_url'] = e.course.url
			e_hash['completed'] = e.updated_at
			@response['transcript'] << e_hash
		end
		render json: @response
	end

	private

	def enrollment_params
		params.require(:enrollment).permit(:course_id)
	end
end
