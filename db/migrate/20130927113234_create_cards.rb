class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.date :date
      t.integer :yellow
      t.integer :red

      t.timestamps
    end
  end
end
