class CoursesController < ApplicationController

	def index
		@courses = Course.all
		render json: @courses
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

	def delete
		@course = Course.find(params[:course][:id])
		@course.destroy!
	end

	private

	def course_params
		params.require(:course).permit(:author, :title, :url, :description, :free, :publisher, :difficulty)
	end
end
