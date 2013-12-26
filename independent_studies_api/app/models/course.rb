class Course < ActiveRecord::Base
	has_many :enrollments
	has_many :users, through: :enrollments
	has_many :tag_associations
	has_many :tags, -> { distinct }, through: :tag_associations
	has_many :links, dependent: :destroy
end
