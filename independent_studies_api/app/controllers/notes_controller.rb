class NotesController < ApplicationController
	def create
		@note = Note.new(note_params)
		@note.user_id = session[:id]
		@note.save
		
		render json: @note
	end

	def update
		@note = Note.find(params[:id])
		puts "note is #{@note}"
		@note.text = params[:note][:text]
		@note.save

		render json: @note
	end

	private

	def note_params
		params.require(:note).permit(:enrollment_id, :text, :title)
	end
end
