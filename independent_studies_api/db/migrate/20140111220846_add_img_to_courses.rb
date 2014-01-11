class AddImgToCourses < ActiveRecord::Migration
  def up
  	add_column :courses, :img, :string, :default => ""
  end

  def down
  	remove_column :courses, :img, :string
  end
end
