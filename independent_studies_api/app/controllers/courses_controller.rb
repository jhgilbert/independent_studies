class CoursesController < ApplicationController
	before_filter :verify_admin_privileges, :only => [:create, :destroy, :update]

	def index
		# TODO: Admin and the course listing need different things ... may be 
		# worth splitting into two routes to speed up both types of requests

		@response = {}
		courses = Course.all
		if params
			if params[:language] != "any"
				courses = courses.where(:language => params[:language]).load
			end
			if params[:framework] != "any"
				courses = courses.where(:framework => params[:framework]).load
			end
			if params[:difficulty] != "any"
				courses = courses.where(:difficulty => params[:difficulty]).load
			end
			if params[:cost] != "any"
				courses = courses.where(:cost => params[:cost]).load
			end
			if params[:format] != "any"
				courses = courses.where(:format => params[:format]).load
			end
			if params[:environment] != "any"
				courses = courses.where(:environment => params[:environment]).load
			end
		end
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
		@course.save!
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
		params.require(:course).permit(:author, :title, :url, :description, :publisher, :difficulty, :cost, :environment, :language, :format, :framework)
	end
end
