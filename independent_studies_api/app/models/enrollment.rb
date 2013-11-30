class Enrollment < ActiveRecord::Base
	belongs_to :course
	belongs_to :user
	has_many :advancements
	has_many :notes
end
