class CreateLinks < ActiveRecord::Migration
  def change
    create_table :links do |t|
      t.string :url
      t.string :name
      t.integer :course_id

      t.timestamps
    end
  end
end
