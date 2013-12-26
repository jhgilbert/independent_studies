class Enrollment < ActiveRecord::Base
	belongs_to :course
	belongs_to :user
	has_many :advancements, dependent: :destroy
	has_many :notes, dependent: :destroy
end
