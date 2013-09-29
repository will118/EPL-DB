class CreatePossessions < ActiveRecord::Migration
  def change
    create_table :possessions do |t|
      t.date :date
      t.integer :possession

      t.timestamps
    end
  end
end
