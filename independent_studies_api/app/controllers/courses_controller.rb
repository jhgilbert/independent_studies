class CoursesController < ApplicationController

	def index
		@response = {}
		courses = Course.all
		enrollment_key = {}
		if session[:id] != nil
			user = User.find(session[:id])
			courses.each do |c|
				if user.courses.include?(c)
					enrollment_key[c.id] = true
				end
			end
		end
		@response['courses'] = courses
		@response['enrollment_key'] = enrollment_key
		render json: @response
	end

	def create
		@course = Course.new(course_params)
		@course.save
		render json: @course
	end

	def update
		@course = Course.find(params[:course][:id])
		@course.update_attributes(course_params)
		@course.save
		render json: @course
	end

	def destroy
		@course = Course.find(params[:id])
		@course.destroy!
		render json: @course
	end

	private

	def course_params
		params.require(:course).permit(:author, :title, :url, :description, :free, :publisher, :difficulty)
	end
end
