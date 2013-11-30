class CoursesController < ApplicationController
	before_filter :verify_admin_privileges, :only => [:create, :destroy, :update]

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

	protected
	def verify_admin_privileges
		user = User.find(session[:id])
		if user.is_admin == false
			render :status => :forbidden, :text => "You don't have permission to do that."
		end
	end

	private

	def course_params
		params.require(:course).permit(:author, :title, :url, :description, :free, :publisher, :difficulty)
	end
end
