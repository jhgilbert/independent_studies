class User < ActiveRecord::Base
	has_many :enrollments
end
