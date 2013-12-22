class TagsController < ApplicationController
  def index
  	# ideal response for display is something like ...
  	# {tags: [
  	#     {category: "language", options: [
  	#         {id: 1, text: "Ruby"}
  	#         {id: 2, text: "Python"}
  	#         ]
  	#     }
  	# ]}

  	# TODO: Create a categories table in the database to simplify this process and avoid repetition.

  	# Make top-level tags array
  	@response = {}
  	@response['tags'] = []
  	
    # make list of categories from tags in database
  	categories = []
  	Tag.all.each do |t|
  		categories << t.category
  	end
  	categories.uniq!

  	# build a hash for each category
  	categories.each do |c|
  		tag_obj = {'category' => c}
  		tag_obj['options'] = []
  		# build array of options for each category hash
  		Tag.where(:category => c).all.each do |tag|
  			tag_obj['options'] << {'id' => tag.id, 'text' => tag.text}
  		end
  		@response['tags'] << tag_obj
  	end
  	render json: @response
  end

  def add
  end

  def remove
  end
end
