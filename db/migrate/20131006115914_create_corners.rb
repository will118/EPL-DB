class CreateCorners < ActiveRecord::Migration
  def change
    create_table :corners do |t|
      t.integer :home
      t.integer :away

      t.timestamps
    end
  end
end
