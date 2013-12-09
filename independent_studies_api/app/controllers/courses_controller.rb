class CoursesController < ApplicationController
	before_filter :verify_admin_privileges, :only => [:create, :destroy, :update]

	def index
		# TODO: Admin and the course listing need different things ... may be 
		# worth splitting into two routes to speed up both types of requests

		@response = {}
		courses = Course.preload(:tags).load
		@courses = []
		puts "Courses is #{courses}"
		courses.each do |c|
			# restrict matches to desired tags
			match_failed = false
			puts "Params tags is #{params[:tags]}"
			if params[:tags]
				params[:tags].split.each do |t|
					tag = Tag.find_by_text(t)
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
		    puts course_info
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
		@course = Course.new(course_params.delete(:tags))
		params[:course][:tags].each do |t|
			tag = Tag.find_by_text(t)
			if tag == nil
				new_tag = Tag.new(:text => t)
				new_tag.save!
				@course.tags << new_tag
			else
				@course.tags << tag
			end
		end
		@course.save
		render json: @course
	end

	def update
		@course = Course.find(params[:course][:id])
		@course.update_attributes(course_params.delete(:tags))
		# Probably a cleaner way to update this ... make it conditional on some other passed param?
		@course.tag_associations.each do |ta|
			ta.destroy!
		end
		puts "params[:course][:tags] is #{course_params[:tags]}"
		params[:course][:tags].each do |t|
			tag = Tag.find_by_text(t)
			if tag == nil
				new_tag = Tag.new(:text => t)
				new_tag.save!
				@course.tags << new_tag
			else
				@course.tags << tag
			end
		end
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
