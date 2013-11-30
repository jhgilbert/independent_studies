class AdvancementsController < ApplicationController
	def create
		@advancement = Advancement.new(advancement_params)
		@advancement.save
		e = @advancement.enrollment
		e.percentage += @advancement.amount
		e.save
		
		render json: @advancement
	end

	private

    def advancement_params
		params.require(:advancement).permit(:amount, :enrollment_id)
	end
end
