class RemoveFieldsFromCourse < ActiveRecord::Migration
  def up
  	remove_column :courses, :language
  	remove_column :courses, :cost
  	remove_column :courses, :format
  	remove_column :courses, :environment
  	remove_column :courses, :framework
  	remove_column :courses, :difficulty
  end

  def down
  	add_column :courses, :language, :string
  	add_column :courses, :cost, :string
  	add_column :courses, :format, :string
  	add_column :courses, :environment, :string
  	add_column :courses, :framework, :string
  	add_column :courses, :difficulty, :string
  end
end
