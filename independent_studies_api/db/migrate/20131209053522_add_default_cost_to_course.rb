class AddDefaultCostToCourse < ActiveRecord::Migration
  def up
  	change_column :courses, :cost, :string, :default => ""
  end

  def down
  	change_column :courses, :cost, :string
  end
end
