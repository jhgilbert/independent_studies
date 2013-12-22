class Tag < ActiveRecord::Base
	has_many :tag_associations, dependent: :destroy
	has_many :courses, -> { distinct }, through: :tag_associations
end
