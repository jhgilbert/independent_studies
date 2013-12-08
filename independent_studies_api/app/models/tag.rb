class Tag < ActiveRecord::Base
	validates :text, :uniqueness => true
	has_many :tag_associations
	has_many :courses, -> { distinct }, through: :tag_associations
end
