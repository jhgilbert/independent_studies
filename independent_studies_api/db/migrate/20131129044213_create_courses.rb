class CreateCourses < ActiveRecord::Migration
  def change
    create_table :courses do |t|
      t.string :author
      t.string :title
      t.text :description
      t.string :difficulty
      t.boolean :free
      t.string :publisher

      t.timestamps
    end
  end
end
