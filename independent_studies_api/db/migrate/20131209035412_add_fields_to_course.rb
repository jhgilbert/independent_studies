class AddFieldsToCourse < ActiveRecord::Migration
  def up
  	add_column :courses, :language, :string
  	add_column :courses, :cost, :string
  	add_column :courses, :format, :string
  	add_column :courses, :environment, :string
  	add_column :courses, :framework, :string
  	remove_column :courses, :free
  end

  def down
  	remove_column :courses, :language, :string
  	remove_column :courses, :cost, :string
  	remove_column :courses, :format, :string
  	remove_column :courses, :environment, :string
  	remove_column :courses, :framework, :string
  	add_column :courses, :free, :boolean
  end
end
