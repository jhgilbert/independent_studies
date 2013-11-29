class CoursesController < ApplicationController
	def index
		@courses = Course.all
		render json: @courses
	end

	def create
		@course = Course.new(params[:course])
		@course.save
		render json: @course
	end

	def update
		@course = Course.find(params[:course][:id])
		@course.author = params[:course][:author]
		@course.title = params[:course][:title]
		@course.description = params[:course][:description]
		@course.free = params[:course][:free]
		@course.difficulty = params[:course][:difficulty]
		@course.publisher = params[:course][:publisher]
		@course.save
		render json: @course
	end

	def delete
		@course = Course.find(params[:course][:id])
		@course.destroy!
	end
end
