class AdvancementsController < ApplicationController
	def create
		@advancement = Advancement.new(advancement_params)
		@advancement.save

		render json: @advancement
	end

	private

    def advancement_params
		params.require(:advancement).permit(:amount, :enrollment_id)
	end
end
