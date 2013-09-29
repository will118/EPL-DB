class CreatePassings < ActiveRecord::Migration
  def change
    create_table :passings do |t|
      t.date :date
      t.integer :totalpasses
      t.integer :keypasses
      t.integer :assists

      t.timestamps
    end
  end
end
