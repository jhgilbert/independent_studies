class EnrollmentsController < ApplicationController
	def create
		@enrollment = Enrollment.new
		@enrollment.user_id = session[:id]
		@enrollment.course_id = params[:enrollment][:course_id]
		@enrollment.percentage = 0
		@enrollment.save
		render json: @enrollment
	end

	private

	def enrollment_params
		params.require(:enrollment).permit(:course_id)
	end
end
