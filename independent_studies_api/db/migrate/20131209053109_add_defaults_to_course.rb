class AddDefaultsToCourse < ActiveRecord::Migration
  def up
  	change_column :courses, :framework, :string, :default => ""
  	change_column :courses, :language, :string, :default => ""
  	change_column :courses, :author, :string, :default => ""
  	change_column :courses, :publisher, :string, :default => ""
  	change_column :courses, :framework, :string, :default => ""
  	change_column :courses, :url, :string, :default => ""
  	change_column :courses, :difficulty, :string, :default => ""
  	change_column :courses, :environment, :string, :default => ""
  end

  def down
  	change_column :courses, :framework, :string
  	change_column :courses, :language, :string
  	change_column :courses, :author, :string
  	change_column :courses, :publisher, :string
  	change_column :courses, :framework, :string
  	change_column :courses, :url, :string
  	change_column :courses, :difficulty, :string
  	change_column :courses, :environment, :string
  end
end
