class CoursesController < ApplicationController
	before_filter :verify_admin_privileges, :only => [:create, :destroy, :update]
 
    def index
        # TODO: Admin and the course listing need different things ... may be 
        # worth splitting into two routes to speed up both types of r
        @response = {}
        courses = Course.preload(:tags).load
        @courses = []
        courses.each do |c|
                # restrict matches to desired tags
                match_failed = false
                if params[:tags] != []
                        params[:tags].split(',').each do |id|
                                tag = Tag.find(id)
                                match_failed = true unless c.tags.include?(tag)
                        end
                end
                next if match_failed
                # add tags into returned data - only really needed for admin
                course_info = c.attributes # TODO: Method is expensive ... is there a better way?
                course_info['tags'] = []
                c.tags.each do |t|
                        course_info['tags'] << t.text
                end
            @courses << course_info
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
        @response['courses'] = @courses
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
		params.require(:course).permit(:author, :title, :url, :description, :img, :publisher, :difficulty, :cost, :environment, :language, :format, :framework)
	end
end
